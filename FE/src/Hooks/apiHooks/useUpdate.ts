import { updateData } from "@/services/crudApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdate<T>(path: string) {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { itemId: string; data: T }>({
    mutationFn: async ({itemId, data}) => {
      return await updateData(path, itemId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [path] });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
}
