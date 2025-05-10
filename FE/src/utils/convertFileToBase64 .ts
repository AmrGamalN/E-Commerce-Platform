export const convertFileToBase64 = (
  file: File,
): Promise<string | string[] | File[] | undefined | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to base64 to make images display
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = (base64: string, filenameWithoutExt: string): File | null => {
  if (!base64) {
    console.error("base64 string is undefined or empty");
    return null;
  }
  const mimeType = base64?.split(":")[1]?.split(";")[0];
  const extension = mimeType?.split("/")[1];

  const base64Data = base64?.split(",")[1];

  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString?.charCodeAt(i);
  }
  const fullFilename = `${filenameWithoutExt}.${extension}`;
  return new File([bytes], fullFilename, { type: mimeType });
};
