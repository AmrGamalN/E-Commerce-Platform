import { ZodObject, ZodRawShape } from "zod";
import { serviceResponse } from "./response.util";
import { ServiceResponseType } from "../types/response.type";
import { ValidateZodType } from "../types/utils.type";
import { filterDataByRole } from "./filterDataByRole.utils";

export const validateAndFormatData = ({
  data,
  userDto,
  adminDto,
  viewerRole,
  actionType,
}: ValidateZodType): ServiceResponseType => {
  if (!data) return serviceResponse({ statusText: "NotFound", data: [] });

  if (
    Object.keys(data).length === 0 &&
    (actionType == "update" || actionType == "delete")
  )
    return serviceResponse({
      statusText: "BadRequest",
      message: "No data provided for update",
      data: [],
    });

  let dto: ZodObject<ZodRawShape>;
  if (viewerRole) {
    dto = filterDataByRole(viewerRole, userDto, adminDto);
  } else {
    dto = userDto;
  }

  // Validate List Of Data [getAll]
  if (actionType === "getAll") {
    return validateListOfData(data, dto);
  }

  // Validate Single Data [getOne]
  return validateSingleData(data, dto);
};

const validateListOfData = (
  data: any[],
  dto: ZodObject<ZodRawShape>
) => {
  const validationResultList = data.map((item: any) => {
    const validationResult = dto.safeParse(item);
    if (!validationResult.success)
      return serviceResponse({
        statusText: "BadRequest",
        error: validationResult.error,
      });
    return validationResult.data;
  });

  return serviceResponse({
    data: validationResultList.length > 0 ? validationResultList : null,
  });
};

const validateSingleData = (data: any, dto: any) => {
  const validationResult = dto.safeParse(data);
  if (!validationResult.success)
    return serviceResponse({
      statusText: "BadRequest",
      error: validationResult.error,
    });
  return serviceResponse({
    data: validationResult.data,
  });
};
