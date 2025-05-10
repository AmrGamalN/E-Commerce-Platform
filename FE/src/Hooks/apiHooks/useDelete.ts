import { deleteData } from "@/services/crudApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDelete(path: string) {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (itemId: string) => {
      return await deleteData(path, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [path] });
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
}
