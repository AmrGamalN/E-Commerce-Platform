// hooks/useAddresses.ts

import { Address } from "@/types/address";
import { useFetch } from "../apiHooks/useFetch";
type addressResponse = {
  data: Address[];
};
export const useFetchAddresses = () => {
  return useFetch<addressResponse>("address");
};
