// all api hooks here
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/services/crudApi";

export const useFetch = <T>(path: string, enabled = true) => {
  return useQuery({
    queryKey: [path],
    queryFn: () => fetchData<T>(path),
    retry: 1,
    enabled,
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });
};
// use mockdata here if refect fails one time untill we launch
