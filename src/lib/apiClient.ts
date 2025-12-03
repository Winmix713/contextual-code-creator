import { supabase } from "@/integrations/supabase/client";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CallEdgeFunctionOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  params?: Record<string, string | undefined>;
}

export async function callEdgeFunction<T = unknown>(
  functionName: string,
  options: CallEdgeFunctionOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const { method = "POST", body, params } = options;

    // Build query string for GET requests
    let queryString = "";
    if (params) {
      const filteredParams = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
        .join("&");
      if (filteredParams) {
        queryString = `?${filteredParams}`;
      }
    }

    const { data, error } = await supabase.functions.invoke<T>(
      `${functionName}${queryString}`,
      {
        method,
        body: method !== "GET" ? body : undefined,
      }
    );

    if (error) {
      return {
        success: false,
        error: error.message || "Unknown error occurred",
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Helper for GET requests
export async function getFromEdgeFunction<T = unknown>(
  functionName: string,
  params?: Record<string, string | undefined>
): Promise<ApiResponse<T>> {
  return callEdgeFunction<T>(functionName, { method: "GET", params });
}

// Helper for POST requests
export async function postToEdgeFunction<T = unknown>(
  functionName: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  return callEdgeFunction<T>(functionName, { method: "POST", body });
}
