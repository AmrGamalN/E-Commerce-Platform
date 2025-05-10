// Define Formik types
export type FormValues = {
  itemImages: File[] | string[];
  angles: string[];
  title: string;
  description: string;
  category: string;
  subcategory: string;
  type: string;
  color: string[];
  size: string;
  brand: string;
  condition: string;
  location: string;
  price: string;
  isDiscount: boolean;
  discount: string;
  allowNegotiate: boolean;
  paymentOptions: string[];
  communications: string[];
  isSavedForLater: boolean;
};

export type CommunicationOption = "phone" | "HDchat" | "both" | null;
export type LoadingStatus = "pending" | "success" | "error" | "idle";
