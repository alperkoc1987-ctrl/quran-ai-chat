import { getLoginUrl } from "@/const";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } =
    options ?? {};
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get user from localStorage (no authentication required)
  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem("manus-runtime-user-info");
      if (stored && stored !== "null" && stored !== "undefined") {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse user info:", e);
    }
    return null;
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      localStorage.removeItem("manus-runtime-user-info");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Logout failed"));
    } finally {
      setLoading(false);
    }
  }, []);

  const state = useMemo(() => {
    return {
      user: user ?? null,
      loading,
      error,
      isAuthenticated: Boolean(user),
    };
  }, [user, loading, error]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (loading) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    loading,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => Promise.resolve(),
    logout,
  };
}
