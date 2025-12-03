"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { callEdgeFunction, type ApiResponse } from "@/lib/apiClient"
import { useToast } from "@/hooks/use-toast"

// Generic query options for edge functions (React Query v5 compatible)
export interface UseEdgeFunctionQueryOptions<T = unknown> {
  functionName: string
  options?: Parameters<typeof callEdgeFunction>[1]
  onSuccessCallback?: (data: T) => void
  onErrorCallback?: (error: string) => void
  enabled?: boolean
  refetchInterval?: number
  staleTime?: number
}

// Generic mutation options for edge functions
export interface UseEdgeFunctionMutationOptions<T = unknown> {
  functionName: string
  options?: Parameters<typeof callEdgeFunction>[1]
  onSuccessCallback?: (data: T) => void
  onErrorCallback?: (error: string) => void
}

/**
 * Hook for calling edge functions with React Query integration
 */
export function useEdgeFunction<T = unknown>(
  functionName: string,
  options: Parameters<typeof callEdgeFunction>[1] = {},
) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation<ApiResponse<T>, Error, unknown>({
    mutationFn: (variables?: unknown) => {
      return callEdgeFunction<T>(functionName, {
        ...options,
        body: variables || options.body,
      })
    },
    onSuccess: (result) => {
      if (result.success && result.data) {
        queryClient.invalidateQueries({ queryKey: [functionName] })
        toast({
          title: "Success",
          description: `${functionName} completed successfully`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        })
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  return mutation
}

/**
 * Hook for querying data from edge functions (React Query v5 compatible)
 */
export function useEdgeFunctionQuery<T = unknown>({
  functionName,
  options,
  onSuccessCallback,
  onErrorCallback,
  enabled = true,
  refetchInterval,
  staleTime,
}: UseEdgeFunctionQueryOptions<T>) {
  const { toast } = useToast()

  return useQuery<ApiResponse<T>, Error, T | null>({
    queryKey: [functionName, options],
    queryFn: async () => {
      const result = await callEdgeFunction<T>(functionName, options)
      // Handle callbacks in queryFn since v5 removed onSuccess/onError from options
      if (result.success && result.data) {
        onSuccessCallback?.(result.data)
      } else if (result.error) {
        onErrorCallback?.(result.error)
      }
      return result
    },
    select: (data: ApiResponse<T>) => (data.success ? (data.data ?? null) : null),
    enabled: enabled && functionName !== undefined,
    refetchInterval,
    staleTime,
  })
}

/**
 * Hook for mutating data via edge functions (React Query v5 compatible)
 */
export function useEdgeFunctionMutation<T = unknown>({
  functionName,
  options,
  onSuccessCallback,
  onErrorCallback,
}: UseEdgeFunctionMutationOptions<T>) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation<ApiResponse<T>, Error, unknown>({
    mutationFn: (variables: unknown) => {
      return callEdgeFunction<T>(functionName, {
        ...options,
        body: variables,
      })
    },
    onSuccess: (result) => {
      if (result.success && result.data) {
        onSuccessCallback?.(result.data)
        queryClient.invalidateQueries({ queryKey: [functionName] })
        toast({
          title: "Success",
          description: `${functionName} completed successfully`,
        })
      } else {
        onErrorCallback?.(result.error || "Unknown error")
        toast({
          title: "Error",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        })
      }
    },
    onError: (error) => {
      onErrorCallback?.(error.message)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

/**
 * Pre-configured hooks for common edge functions
 */

// Jobs management
export const useJobsList = () =>
  useEdgeFunctionQuery({
    functionName: "jobs-list",
    options: { method: "GET" },
  })

export const useJobCreate = () =>
  useEdgeFunctionMutation({
    functionName: "jobs-create",
  })

export const useJobToggle = () =>
  useEdgeFunctionMutation({
    functionName: "jobs-toggle",
  })

// Models management
export const useModelsPerformance = () =>
  useEdgeFunctionQuery({
    functionName: "models-performance",
    options: { method: "GET" },
  })

export const useModelCompare = () =>
  useEdgeFunctionMutation({
    functionName: "models-compare",
  })

// Analytics
export const useMonitoringMetrics = () =>
  useEdgeFunctionQuery({
    functionName: "monitoring-metrics",
    options: { method: "GET" },
  })

export const useAnalyticsData = () =>
  useEdgeFunctionQuery({
    functionName: "analytics-data",
    options: { method: "GET" },
  })

// Phase 9
export const usePhase9CollaborativeIntelligence = () =>
  useEdgeFunctionQuery({
    functionName: "phase9-collaborative-intelligence",
    options: { method: "GET" },
  })

export const usePhase9MarketIntegration = () =>
  useEdgeFunctionMutation({
    functionName: "phase9-market-integration",
  })

// Cross-league
export const useCrossLeagueAnalyze = () =>
  useEdgeFunctionMutation({
    functionName: "cross-league-analyze",
  })

export const useCrossLeagueCorrelations = () =>
  useEdgeFunctionQuery({
    functionName: "cross-league-correlations",
    options: { method: "GET" },
  })

// Pattern detection
export const usePatternsDetect = () =>
  useEdgeFunctionMutation({
    functionName: "patterns-detect",
  })

export const useMetaPatternsDiscover = () =>
  useEdgeFunctionMutation({
    functionName: "meta-patterns-discover",
  })

// AI Chat
export const useAIChat = () =>
  useEdgeFunctionMutation({
    functionName: "ai-chat",
  })

// Admin functions
export const useAdminModelAnalytics = () =>
  useEdgeFunctionQuery({
    functionName: "admin-model-analytics",
    options: { method: "GET" },
  })

export const useAdminModelTriggerTraining = () =>
  useEdgeFunctionMutation({
    functionName: "admin-model-trigger-training",
  })

export const useAdminPredictionReview = () =>
  useEdgeFunctionQuery({
    functionName: "admin-prediction-review",
    options: { method: "GET" },
  })

// Prediction Analyzer
export const usePredictionAnalyzer = (params?: {
  metric?: "accuracy_trends" | "league_breakdown" | "confidence_calibration"
  start_date?: string
  end_date?: string
  league?: string
}) =>
  useEdgeFunctionQuery({
    functionName: "prediction-analyzer",
    options: {
      method: "GET",
      params: params,
    },
  })

// Value Ranking for predictions
export const useValueRankedPredictions = (matchIds?: string[]) =>
  useEdgeFunctionQuery({
    functionName: "get-predictions",
    options: {
      method: "GET",
      params: {
        value_ranking: "true",
        match_ids: matchIds?.join(","),
      },
    },
    enabled: !!(matchIds && matchIds.length > 0),
  })
