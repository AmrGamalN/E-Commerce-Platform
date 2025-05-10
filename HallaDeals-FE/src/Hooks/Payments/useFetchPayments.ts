import { useFetch } from "../apiHooks/useFetch";
type paymentResponse = {
  data: string[];
};
export const UseFetchPayment = () => {
  return useFetch<paymentResponse>("payment");
};
