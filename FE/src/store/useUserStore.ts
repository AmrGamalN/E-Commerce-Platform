"use client";

import { User } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (updatedUser: Partial<User>) => void;
  clearUser: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updatedUser) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    })),
  clearUser: () => set({ user: null }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
