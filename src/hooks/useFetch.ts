import useSWR, { SWRConfiguration } from "swr";
import {
  swrConfig,
  swrConfigRealTime,
  swrConfigStatic,
} from "@/lib/swrConfig";
import { getUserProfile, UserProfile } from "@/utils/user/userProfile";

interface UseFetchOptions extends SWRConfiguration {
  mode?: "default" | "realtime" | "static";
}

/**
 * Custom hook for data fetching with SWR
 * @param url - The API endpoint URL
 * @param options - SWR configuration options with mode support
 * @returns SWR response object with data, error, isLoading, and mutate
 */
export function useFetch<T>(url: string | null, fetcherFn?: () => Promise<T>, options?: UseFetchOptions) {
  const { mode = "default", ...customConfig } = options || {};

  let config: SWRConfiguration;
  switch (mode) {
    case "realtime":
      config = swrConfigRealTime;
      break;
    case "static":
      config = swrConfigStatic;
      break;
    default:
      config = swrConfig;
  }

  const mergedConfig = { ...config, ...customConfig };

  const { data, error, isLoading, mutate } = useSWR<T>(
    url ?? null,
    fetcherFn ?? null,
    mergedConfig,
  );

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    mutate,
  };
}

/**
 * Hook for fetching user profile using axios with auth
 * Token is automatically attached from Redux store
 */
export function useUserProfile() {
  const { data, error, isLoading, mutate } = useFetch<UserProfile>(
    "user-profile",
    getUserProfile,
    { mode: "static" }
  );

  return {
    userProfile: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook for POST requests with automatic revalidation
 * @param url - The API endpoint URL
 */
export function useMutate(url: string | null) {
  const { mutate } = useSWR(url, null, swrConfig);

  const handleMutate = async (body: unknown) => {
    try {
      const response = await fetch(url!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Mutation failed");

      const result = await response.json();
      mutate(result, false); // Update cache without revalidation
      return result;
    } catch (error) {
      console.error("Mutation error:", error);
      throw error;
    }
  };

  return { mutate: handleMutate };
}
