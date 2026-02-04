import React, { Component, type ReactNode } from 'react';
import { useTheme } from '../../theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Error Fallback UI Component
 * Displays a user-friendly error message when components fail
 */
const ErrorFallback: React.FC<{ error: Error | null }> = ({ error }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.border.default}`,
        borderRadius: '8px',
        margin: theme.spacing.lg,
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSize.xl,
          marginBottom: theme.spacing.md,
        }}
      >
        Something went wrong
      </h2>
      <p
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSize.base,
          marginBottom: theme.spacing.lg,
        }}
      >
        We're sorry, but something unexpected happened. Please try refreshing the page.
      </p>
      {import.meta.env.DEV && error && (
        <details
          style={{
            marginTop: theme.spacing.lg,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.background.primary,
            border: `1px solid ${theme.colors.border.default}`,
            borderRadius: '4px',
            textAlign: 'left',
          }}
        >
          <summary
            style={{
              color: theme.colors.text.secondary,
              cursor: 'pointer',
              marginBottom: theme.spacing.sm,
            }}
          >
            Error Details (Development)
          </summary>
          <pre
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.sm,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
      <button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: theme.colors.accent.primary,
          color: theme.colors.background.primary,
          border: 'none',
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          borderRadius: '4px',
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.medium,
          cursor: 'pointer',
          marginTop: theme.spacing.lg,
        }}
      >
        Refresh Page
      </button>
    </div>
  );
};

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree and displays fallback UI
 * Implements React Error Boundary pattern for graceful error handling
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return <ErrorFallback error={this.state.error} />;
    }

    // Render children normally when there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;