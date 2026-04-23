import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ success: false, message: err.message });
  }

  return res.status(501).json({ success: false, message: String(err) });
}
