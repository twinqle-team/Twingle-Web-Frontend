import React, { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center ">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center border-t-4 border-emerald-500">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#004e27]">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-2">
              We encountered an unexpected error while rendering this page.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 bg-gray-50 border border-emerald-200 rounded text-sm text-gray-800 text-left overflow-auto max-h-32">
                <p className="font-semibold mb-1 text-emerald-700">
                  Error Details:
                </p>
                <code className="text-xs">{this.state.error.toString()}</code>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-[#004e27] hover:bg-[#004e27] text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded transition duration-200"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
