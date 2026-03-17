import { Component } from "react";

import type { ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-sm text-muted">Error</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-fg">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            An unexpected error occurred. Please refresh the page to try again.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-8 text-sm underline underline-offset-4 transition-colors hover:text-muted"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
