// hooks/useAddresses.ts
import { Address } from "@/types/address";
import { fetchSingleData } from "@/services/crudApi";
import { useQuery } from "@tanstack/react-query";
type addressResponse = {
  data: Address;
};
export const useFetchAddressesById = (userId: string) => {
  return useQuery({
    queryKey: ["address/get", userId],
    queryFn: () => fetchSingleData<addressResponse>("address/get", userId),
    enabled: !!userId,
  });
};
