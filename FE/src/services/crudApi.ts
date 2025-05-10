import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

const handleError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    console.log(
      `error message is "${error.response.data?.message}" with status code "${error.response.status}" error type is "${error.response.statusText}"`,
    );
  } else {
    console.error("An unknown error occurred:", error);
  }
};

// items api
export const fetchData = async <T>(path: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(`/${path}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error(`Failed to fetch data from ${path}`);
  }
};

export const fetchSingleData = async <T>(path: string, id: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(`/${path}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to fetch item");
  }
};

export const addData = async <T>(path: string, data: T): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/${path}`, data, {
      headers: {
        ...(data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
      },
    });
    return response?.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to add item");
  }
};

export const updateData = async <T>(path: string, id: string, data: T): Promise<string> => {
  try {
    const response = await axiosInstance.put(`/${path}/${id}`, data);
    return response?.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to update item");
  }
};

export const deleteData = async (path: string, id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/${path}/${id}`);
    return response?.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to delete item");
  }
};
