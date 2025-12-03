import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react"; // Feltételezve, hogy a lucide-react telepítve van

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    // Fejlesztői környezetben logolunk
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary caught error]", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full p-6 rounded-lg border bg-card text-card-foreground shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/20">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h1 className="text-xl font-bold mb-2">Valami hiba történt</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Sajnáljuk, váratlan hiba lépett fel az alkalmazás futása közben.
            </p>
            {this.state.error && import.meta.env.DEV && (
              <pre className="text-xs text-left bg-muted p-2 rounded mb-4 overflow-auto max-h-40">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
            >
              Oldal újratöltése
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
