export interface ModelStatus {
  id: string;
  name: string;
  version: string;
  status: "active" | "inactive" | "training" | "error";
  accuracy: number;
  lastUpdated: string;
  predictions: number;
}

export interface SystemLog {
  id: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  source: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ModelAnalytics {
  totalPredictions: number;
  accuracy: number;
  avgConfidence: number;
  topPerformingModel: string;
  recentTrend: "up" | "down" | "stable";
}

export interface PredictionReviewItem {
  id: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  predictedOutcome: string;
  actualOutcome: string | null;
  confidence: number;
  wasCorrect: boolean | null;
  createdAt: string;
}

export interface DataConfiguration {
  lookbackDays: number;
  minConfidenceThreshold: number;
  autoRetrainEnabled: boolean;
  retrainIntervalHours: number;
}

// API Response types
export interface SystemStatusResponse {
  status: "healthy" | "degraded" | "error";
  models: ModelStatus[];
  lastUpdated: string;
  metrics?: {
    uptime: number;
    requestCount: number;
    errorRate: number;
  };
}

export interface AnalyticsResponse {
  analytics: ModelAnalytics;
  trends: Array<{
    date: string;
    accuracy: number;
    predictions: number;
  }>;
  windowDays: number;
}

export interface TrainingRequest {
  modelType?: string;
  forceRetrain?: boolean;
  parameters?: Record<string, unknown>;
}

export interface TrainingResponse {
  success: boolean;
  jobId?: string;
  message: string;
  estimatedDuration?: number;
}

export interface PromoteModelRequest {
  modelId: string;
  targetEnvironment: "staging" | "production";
  notes?: string;
}

export interface PromoteModelResponse {
  success: boolean;
  message: string;
  promotedAt?: string;
}
