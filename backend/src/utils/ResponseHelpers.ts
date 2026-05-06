// ResponseHelper.ts
import { Response } from "express";
import { AppError } from "./AppError";
import { ErrorCode } from "../shared/types/ErrorCode";

export class ResponseHelper {
  // Grouped success helpers
  static success = {
    generic<T>(res: Response, message: string, data: T, statusCode = 200) {
      return res.status(statusCode).json({ success: true, message, data });
    },

    created<T>(res: Response, data: T, message = "Resource created") {
      return ResponseHelper.success.generic(res, message, data, 201);
    },

    found<T>(res: Response, data: T, message = "Resource found") {
      return ResponseHelper.success.generic(res, message, data, 200);
    },

    accepted<T>(res: Response, data: T, message = "Request accepted") {
      return ResponseHelper.success.generic(res, message, data, 202);
    },

    authorized<T>(res: Response, data: T, message = "Authorized") {
      return ResponseHelper.success.generic(res, message, data, 200);
    },

    updated<T>(res: Response, data: T, message = "Resource updated") {
      return ResponseHelper.success.generic(res, message, data, 200);
    },

    deleted<T>(res: Response, data: T, message = "Resource deleted") {
      return ResponseHelper.success.generic(res, message, data, 200);
    },
  };

  // Grouped error helpers
  static error = {
    generic(message = "An Error Occurred", statusCode = 500): never {
      throw new AppError(message, statusCode, ErrorCode.INTERNAL_ERROR);
    },

    notFound(message = "Resource not found"): never {
      throw new AppError(message, 404, ErrorCode.NOT_FOUND);
    },

    unauthorized(message = "Unauthorized"): never {
      throw new AppError(message, 401, ErrorCode.UNAUTHORIZED);
    },

    forbidden(message = "Forbidden"): never {
      throw new AppError(message, 403, ErrorCode.FORBIDDEN);
    },

    timeout(message = "Request timed out"): never {
      throw new AppError(message, 408, ErrorCode.TIMEOUT);
    },

    conflict(message = "Conflict"): never {
      throw new AppError(message, 409, ErrorCode.CONFLICT);
    },

    badRequest(message = "Bad request"): never {
      throw new AppError(message, 400, ErrorCode.BAD_REQUEST);
    },

    rejected(message = "Request rejected"): never {
      throw new AppError(message, 422, ErrorCode.UNPROCESSABLE_ENTITY);
    },
  };
}
