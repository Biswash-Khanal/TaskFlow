import { Response } from "express";
import { AppError } from "./AppError";

export function successResponse<T>(res: Response, successData: T) {
  return res.json({ success: true, data: successData });
}

export function errorResponse<T>(
  message = "An Error Occured",
  statusCode = 500,
) {
  throw new AppError(message, statusCode);
}
