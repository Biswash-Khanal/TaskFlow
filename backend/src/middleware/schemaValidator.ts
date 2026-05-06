import { NextFunction, Request, Response } from "express";
import z from "zod";
import { ResponseHelper } from "../utils/ResponseHelpers";

export function schemaValidator<T>(validationSchema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedData = validationSchema.safeParse(req.body);

    if (parsedData.success == false) {
      return next(parsedData.error);
    }

    req.body = parsedData.data;
    return next();
  };
}
