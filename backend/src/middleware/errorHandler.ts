import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    console.log(err);
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, data: null });
  }
  if (err instanceof Error) {
    console.log(err);

    return res
      .status(500)
      .json({ success: false, message: err.message, data: null });
  }
  console.log(err);

  return res
    .status(501)
    .json({ success: false, message: String(err), data: null });
}
