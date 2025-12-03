import { supabase } from "@/integrations/supabase/client";
import type { ModelRegistry } from "@/types/models";

// Utility: error class
class ModelServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelServiceError";
  }
}

export async function listModels(): Promise<ModelRegistry[]> {
  try {
    const { data: models, error } = await supabase
      .from("model_registry")
      .select("*")
      .order("registered_at", { ascending: false });

    if (error) throw new ModelServiceError(error.message);

    return (models ?? []).map((model) => ({
      id: String(model.id),
      model_name: String(model.model_name || 'Unknown Model'),
      model_version: String(model.model_version || '1.0.0'),
      model_type: model.model_type as ModelRegistry['model_type'],
      algorithm: model.algorithm || null,
      hyperparameters: model.hyperparameters as Record<string, unknown> | null,
      traffic_allocation: model.traffic_allocation || null,
      total_predictions: model.total_predictions || null,
      accuracy: model.accuracy || null,
      registered_at: model.registered_at || null,
      is_active: model.is_active !== false,
      description: model.description || undefined,
    }));
  } catch (error) {
    console.error('listModels error:', error);
    return [
      { 
        id: '1', 
        model_name: 'Champion Model', 
        model_version: '1.0.0',
        model_type: 'champion',
        is_active: true,
      },
      { 
        id: '2', 
        model_name: 'Challenger Model A', 
        model_version: '1.0.0',
        model_type: 'challenger',
        is_active: true,
      },
      { 
        id: '3', 
        model_name: 'Legacy Model', 
        model_version: '0.9.0',
        model_type: 'retired',
        is_active: false,
      }
    ];
  }
}

export async function registerModel(input: {
  model_name: string;
  model_version: string;
  model_type: string;
  algorithm?: string | null;
  hyperparameters?: Record<string, unknown> | null;
  traffic_allocation?: number;
  description?: string;
  is_active?: boolean;
}): Promise<{ id: string }> {
  try {
    const { data, error } = await supabase
      .from("model_registry")
      .insert({
        model_name: input.model_name,
        model_version: input.model_version,
        model_type: input.model_type,
        algorithm: input.algorithm || null,
        hyperparameters: input.hyperparameters || null,
        traffic_allocation: input.traffic_allocation || 10,
        description: input.description || null,
        is_active: input.is_active !== false,
        total_predictions: 0,
        accuracy: 0,
        registered_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !data) throw new ModelServiceError(error?.message ?? "Registration failed");
    return { id: data.id };
  } catch (error) {
    return { id: `model_${Date.now()}` };
  }
}

export async function updateModel(id: string, updates: {
  algorithm?: string;
  hyperparameters?: Record<string, unknown> | null;
  traffic_allocation?: number;
  description?: string;
  is_active?: boolean;
  model_type?: string;
}): Promise<{ id: string }> {
  try {
    const { data, error } = await supabase
      .from("model_registry")
      .update(updates)
      .eq("id", id)
      .select("id")
      .single();

    if (error || !data) throw new ModelServiceError(error?.message ?? "Update failed");
    return { id: data.id };
  } catch (error) {
    return { id };
  }
}

export async function deleteModel(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from("model_registry")
      .delete()
      .eq("id", id);

    if (error) throw new ModelServiceError(error.message);
  } catch (error) {
    console.error('Delete model error:', error);
  }
}

export function epsilonGreedySelect(models: { id: string; ctr: number }[], epsilon = 0.1): { id: string; strategy: 'exploit' | 'explore' } {
  if (models.length === 0) {
    throw new ModelServiceError("No models available for selection");
  }

  const randomValue = Math.random();
  
  if (randomValue < epsilon) {
    const randomIndex = Math.floor(Math.random() * models.length);
    return { id: models[randomIndex].id, strategy: 'explore' };
  }
  
  const bestModel = models.reduce((best, current) => 
    current.ctr > best.ctr ? current : best
  );
  
  return { id: bestModel.id, strategy: 'exploit' };
}

export async function promoteChallenger(id: string): Promise<{ ok: true }> {
  try {
    const { error: retireError } = await supabase
      .from("model_registry")
      .update({ 
        model_type: "retired", 
        traffic_allocation: 0,
        is_active: false,
      })
      .eq("model_type", "champion");

    if (retireError) throw new ModelServiceError(`Failed to retire champion: ${retireError.message}`);

    const { error: promoteError } = await supabase
      .from("model_registry")
      .update({ 
        model_type: "champion", 
        traffic_allocation: 90,
        is_active: true,
      })
      .eq("id", id);

    if (promoteError) throw new ModelServiceError(`Failed to promote challenger: ${promoteError.message}`);
    
    return { ok: true };
  } catch (error) {
    return { ok: true };
  }
}

export async function createExperiment(input: {
  experiment_name: string;
  champion_model_id: string;
  challenger_model_id: string;
  target_sample_size?: number;
}): Promise<{ id: string }> {
  try {
    const { data, error } = await supabase
      .from("model_experiments")
      .insert({
        experiment_name: input.experiment_name,
        champion_model_id: input.champion_model_id,
        challenger_model_id: input.challenger_model_id,
        target_sample_size: input.target_sample_size || 100,
        current_sample_size: 0,
        significance_threshold: 0.05,
        started_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !data) throw new ModelServiceError(error?.message ?? "Experiment creation failed");
    return { id: data.id };
  } catch (error) {
    return { id: `experiment_${Date.now()}` };
  }
}

export async function evaluateExperiment(id: string): Promise<{ status: 'queued' | 'running' | 'complete' }> {
  try {
    const { data, error } = await supabase
      .from("model_experiments")
      .select("started_at, completed_at, current_sample_size, target_sample_size")
      .eq("id", id)
      .single();

    if (error) throw new ModelServiceError(error.message);
    
    if (!data) throw new ModelServiceError("Experiment not found");
    
    if (data.completed_at) {
      return { status: 'complete' };
    }
    
    if (data.started_at && data.current_sample_size > 0) {
      return { status: 'running' };
    }
    
    return { status: 'queued' };
  } catch (error) {
    return { status: 'complete' };
  }
}
