import { Toaster } from "@/components/ui/toaster";
import ToastPortal from "@/components/ui/ToastPortal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import { FeatureFlagsProvider } from "@/providers/FeatureFlagsProvider";
import AppRoutes from "@/components/AppRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";
import logger from "@/lib/logger";

// Sentry csak akkor hívódik meg, ha létezik (opcionális import vagy mock)
const captureExceptionSafe = (error: any, context?: any) => {
  // Itt lehetne Sentry.captureException(error, context);
  // De mivel nincs a kódban, csak logolunk
  if (import.meta.env.PROD) {
    console.error("Sentry capture:", error, context);
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: import.meta.env.DEV,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        logger.error("Mutation error:", error);
      },
    },
  },
});

const App = () => (
  <ErrorBoundary
    onError={(error, info) => {
      logger.error("Unhandled UI error", error);
      captureExceptionSafe(error, { componentStack: info.componentStack });
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <FeatureFlagsProvider>
            <AuthProvider>
              <AppRoutes />
              <ToastPortal />
              <Toaster />
            </AuthProvider>
          </FeatureFlagsProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
