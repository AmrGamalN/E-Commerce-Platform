"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { login as loginAPI, logout as logoutAPI } from "@/services/authService";
import { useFetch } from "@/Hooks/apiHooks/useFetch";
import { useUserStore } from "@/store/useUserStore";
import { LoginResponse } from "@/types/authType";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (password: string, identifier: string, loginChoice: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, clearUser, setIsLoading, isLoading } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  const { data: userData, isLoading: isUserDataLoading, isError, refetch } = useFetch<any>("user/me");

  useEffect(() => {
    if (isError) {
      setError("Failed to fetch user data");
      console.error("Error fetching user data:", isError);
    }
  }, [isError, setError]);

  useEffect(() => {
    if (isUserDataLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isUserDataLoading, setIsLoading]);

  useEffect(() => {
    if (userData && userData.data) {
      setUser(userData.data);
    } else {
      refetch();
    }
  }, [userData, setUser, refetch]);

  const login = async (identifier: string, password: string, loginChoice: string) => {
    setError(null);

    try {
      const data = await loginAPI(identifier, password, loginChoice);
      if (data.success) {
        refetch();
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      console.error("Login error:", err);

      return {
        success: false,
        message: errorMessage,
        status: 500,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
      clearUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
