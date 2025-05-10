import { addData } from "@/services/crudApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useAddData<T>(path: string) {
  const queryClient = useQueryClient();
  return useMutation<string, Error, T | T[]>({
    mutationFn: async (data: T | T[]) => {
      return await addData<T | T[]>(path, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [path] });
    },
    onError: (error) => {
      console.error("Error adding item:", error);
    },
  });
}
