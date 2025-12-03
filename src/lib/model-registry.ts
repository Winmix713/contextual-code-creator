import { supabase } from "@/integrations/supabase/client";

export interface ModelRegistryEntry {
  id: string;
  name: string;
  version: string;
  type: string;
  status: "active" | "archived" | "training" | "pending";
  accuracy?: number;
  created_at: string;
  updated_at: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export async function getModels(): Promise<ModelRegistryEntry[]> {
  try {
    const { data, error } = await supabase
      .from("model_registry")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching model registry:", error);
      return [];
    }

    return (data || []) as ModelRegistryEntry[];
  } catch (err) {
    console.error("Failed to fetch models:", err);
    return [];
  }
}

export async function getActiveModels(): Promise<ModelRegistryEntry[]> {
  const models = await getModels();
  return models.filter((m) => m.status === "active");
}

export async function getModelById(id: string): Promise<ModelRegistryEntry | null> {
  try {
    const { data, error } = await supabase
      .from("model_registry")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching model:", error);
      return null;
    }

    return data as ModelRegistryEntry;
  } catch (err) {
    console.error("Failed to fetch model:", err);
    return null;
  }
}
