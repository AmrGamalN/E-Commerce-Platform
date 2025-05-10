import { FormValues } from "@/types/sellItem";
import { convertFileToBase64 } from "@/utils/convertFileToBase64 ";
import { create } from "zustand";
type ItemsStore = {
  perviewItem: FormValues | null;
  setPerviewItem: (newItem: FormValues) => Promise<void>;
  clearPerviewItem: () => void;
};
export const getInitialPerviewItem = (): FormValues | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("perviewItem");
  return data ? (JSON.parse(data) as FormValues) : null;
};
// convert files to url
const preparePerviewItemForStorage = async (item: FormValues): Promise<FormValues> => {
  const newItemImages = (
    await Promise.all(
      (item.itemImages ?? []).map(async (img) => {
        if (img instanceof File) {
          return await convertFileToBase64(img);
        }
        return img;
      }),
    )
  ).filter((img): img is string => typeof img === "string");

  return {
    ...item,
    itemImages: newItemImages,
  };
};

// set item in localStorafe
export const UsePerviewItemsStore = create<ItemsStore>((set) => ({
  perviewItem: getInitialPerviewItem(),
  setPerviewItem: async (newItem) => {
    const preparedItem = await preparePerviewItemForStorage(newItem);
    set({ perviewItem: preparedItem });
    localStorage.setItem("perviewItem", JSON.stringify(preparedItem));
  },
  clearPerviewItem: () => {
    set({ perviewItem: null });
    localStorage.removeItem("perviewItem");
  },
}));
