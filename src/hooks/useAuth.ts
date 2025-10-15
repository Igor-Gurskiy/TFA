import { useMutation, useQuery } from "@tanstack/react-query";
import { mockAuthApi } from "../services/mockAuthApi";
import type { AuthError } from "../types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: mockAuthApi.login,
    onError: (error: AuthError) => {
      console.error("Login error:", error);
    },
  });
};

export const useVerify2FA = () => {
  return useMutation({
    mutationFn: mockAuthApi.verify2FA,
    onError: (error: AuthError) => {
      console.error("2FA verification error:", error);
    },
  });
};

export const useRequestNew2FACode = () => {
  return useMutation({
    mutationFn: mockAuthApi.requestNew2FACode,
    onError: (error: AuthError) => {
      console.error("Request new 2FA code error:", error);
    },
  });
};

export const use2FAStatus = () => {
  return useQuery({
    queryKey: ["2fa-status"],
    queryFn: mockAuthApi.get2FAStatus,
    refetchInterval: 1000,
    enabled: !!mockAuthApi.get2FAStatus().code,
  });
};
