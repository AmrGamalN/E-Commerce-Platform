import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/user";
import axios from "axios";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get("/user/me");

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch user data");
    }
    throw new Error("Failed to fetch user data");
  }
};
