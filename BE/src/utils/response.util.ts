import { Response } from "express";
import { ResponseOptions, ServiceResponseType } from "../types/response.type";

export const controllerResponse = (
  res: Response,
  response: ServiceResponseType
) => {
  if (!response.success) return res.status(response.status!).json(response);
  return res.status(response.status!).json(response);
};

export const serviceResponse = ({
  statusText,
  message,
  data,
  error,
  count,
  deletedCount,
  updatedCount,
}: ResponseOptions): ServiceResponseType => {
  switch (statusText) {
    case "BadRequest":
      return response({ statusText, message, error });

    case "Conflict":
    case "Created":
    case "NotFound":
    case "Unauthorized":
      return response({ statusText, message, data });

    case "OK":
    default:
      if (statusText == "OK" || data || count || deletedCount || updatedCount)
        return response({
          statusText: "OK",
          message,
          data,
          count,
          deletedCount,
          updatedCount
        });
      return response({ statusText: "NotFound", message });
  }
};

const response = ({
  statusText,
  message,
  data,
  error,
  count,
  deletedCount,
  updatedCount,
}: ResponseOptions): ServiceResponseType => {
  const defaultMessages = {
    OK: "Operation successfully",
    Created: "Resource created successfully",
    BadRequest: "Bad request",
    NotFound: "Item not found",
    Conflict: "Item already exists",
    Unauthorized: "Unauthorized",
  };

  switch (statusText) {
    case "Created":
      return {
        statusText: "Created",
        success: true,
        status: 201,
        message: message ?? defaultMessages.Created,
        data,
      };

    case "OK":
      return {
        statusText: "OK",
        success: true,
        status: 200,
        message: message ?? defaultMessages.OK,
        data: data ?? [],
        count,
        deletedCount,
        updatedCount,
      };

    case "BadRequest":
      return {
        statusText: "BadRequest",
        success: false,
        status: 400,
        message: message ?? defaultMessages.BadRequest,
        error,
      };

    case "NotFound":
      return {
        statusText: "NotFound",
        success: false,
        status: 404,
        message: message ?? defaultMessages.NotFound,
      };

    case "Conflict":
      return {
        statusText: "Conflict",
        success: false,
        status: 409,
        message: message ?? defaultMessages.Conflict,
      };
    case "Unauthorized":
      return {
        statusText: "Unauthorized",
        success: false,
        status: 401,
        message: message ?? defaultMessages.Conflict,
      };

    default:
      return {
        success: false,
        status: 500,
        message: "Internal server error",
      };
  }
};
