"use client";

import useSWR from "swr";
import { getCurrentUser, logout as apiLogout } from "@/lib/api/auth";
import type { AuthUser } from "@/types/api";

export function useAuth() {
  const { data: user, error, isLoading, mutate } = useSWR<AuthUser | null>(
    "auth-me",
    () => getCurrentUser(),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      await mutate(null, false);
    }
  };

  return {
    user: user ?? null,
    isLoading,
    error,
    isAuthenticated: !!user,
    logout,
    refresh: mutate,
  };
}
