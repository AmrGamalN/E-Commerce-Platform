import { Address } from "@/types/address";

export const FormatAddress = (addressObj: Address) => {
  const { suite, houseNumber, street, city, country } = addressObj;

  return [suite, houseNumber, street, city, country]
    .filter((part) => part && part !== "") // Skip empty values
    .join(", ");
};
