import { serviceResponse, responseHandler } from "./responseHandler";
type actionType = "getAll" | "update";
export const validateAndFormatData = (
  retrievedData: any,
  dto: any,
  action?: actionType
): responseHandler => {
  if (!retrievedData)
    return serviceResponse({ statusText: "NotFound", data: [] });

  if (Object.keys(retrievedData).length === 0 && action == "update")
    return serviceResponse({
      statusText: "BadRequest",
      message: "No data provided for update",
      data: [],
    });

  if (action == "getAll") {
    const dataRetrieved = retrievedData.map((data: any) => {
      const parsed = dto.safeParse(data);
      if (!parsed.success)
        return serviceResponse({
          statusText: "BadRequest",
          error: parsed.error,
        });
      return parsed.data;
    });
    return serviceResponse({
      data: dataRetrieved ?? [],
      message: "Get data successfully",
    });
  }

  const parsed = dto.safeParse(retrievedData);
  console.log(parsed.error);
  if (!parsed.success)
    return serviceResponse({ statusText: "BadRequest", error: parsed.error });
  return serviceResponse({
    data: parsed?.data,
    error: parsed?.error,
    message: "Get data successfully",
  });
};
