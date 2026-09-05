import React, { useEffect, useState, useRef } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

interface NetworkErrorProps {
  children?: React.ReactNode;
  onRetry?: () => void;
}

const NetworkError: React.FC<NetworkErrorProps> = ({ children, onRetry }) => {
  const [isOffline, setIsOffline] = useState(false);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkInternetConnection = async () => {
    try {
      // Try to fetch a reliable endpoint with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkNetwork = async () => {
      const isOnline = await checkInternetConnection();
      if (isMounted) {
        setIsOffline(!isOnline);
      }
    };

    // Initial check
    checkNetwork();

    // Check every 5 seconds
    checkIntervalRef.current = setInterval(checkNetwork, 5000);

    // Also listen to browser online/offline events
    const handleOnline = () => {
      checkNetwork();
    };

    const handleOffline = () => {
      checkNetwork();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      isMounted = false;
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    onRetry?.();
    window.location.reload();
  };

  if (isOffline) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center max-w-md px-6 text-center">
          <div className="mb-6 p-6 bg-gray-100 rounded-full">
            <WifiOff className="w-16 h-16 text-gray-500" />
          </div>
          
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            No Internet Connection
          </h1>
          
          <p className="mb-8 text-gray-600">
            Please check your internet connection and try again. You need to be online to use this application.
          </p>
          
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NetworkError;
