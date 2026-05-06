import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";
import { ErrorResponse } from "../shared/types/ErrorResponse";
import { ErrorCode, ErrorTitles } from "../shared/types/ErrorCode";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const instance = req.originalUrl;

  // JWT errors
  if (err instanceof TokenExpiredError) {
    const errorObject: ErrorResponse = {
      code: ErrorCode.TOKEN_EXPIRED,
      title: ErrorTitles[ErrorCode.TOKEN_EXPIRED],
      status: 401,
      detail: err.message,
      instance,
    };
    return res.status(401).json(errorObject);
  }

  if (err instanceof JsonWebTokenError) {
    const errorObject: ErrorResponse = {
      code: ErrorCode.UNAUTHORIZED,
      title: ErrorTitles[ErrorCode.UNAUTHORIZED],
      status: 401,
      detail: err.message,
      instance,
    };
    return res.status(401).json(errorObject);
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    const errorObject: ErrorResponse = {
      code: ErrorCode.VALIDATION_ERROR,
      title: ErrorTitles[ErrorCode.VALIDATION_ERROR],
      status: 400,
      detail:
        "One or more request objects are invalid. Please ensure the request body matches the expected schema.",
      instance,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
    return res.status(400).json(errorObject);
  }

  // Custom AppError
  if (err instanceof AppError) {
    const errorObject: ErrorResponse = {
      code: err.errorCode,
      title: ErrorTitles[err.errorCode],
      status: err.statusCode,
      detail: err.message,
      instance,
    };
    return res.status(err.statusCode).json(errorObject);
  }

  // Generic uncaught errors
  if (err instanceof Error) {
    const errorObject: ErrorResponse = {
      code: ErrorCode.INTERNAL_ERROR,
      title: ErrorTitles[ErrorCode.INTERNAL_ERROR],
      status: 500,
      detail: err.message,
      instance,
    };
    return res.status(500).json(errorObject);
  }

  // Fallback (should never reach here)
  return res.status(501).json({
    code: ErrorCode.INTERNAL_ERROR,
    title: ErrorTitles[ErrorCode.INTERNAL_ERROR],
    status: 500,
    detail: "Unexpected error: please check backend implementation.",
    instance,
  });
}
