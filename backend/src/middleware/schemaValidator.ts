import { NextFunction, Request, Response } from "express";
import z from "zod";
import { ResponseHelper } from "../utils/ResponseHelpers";

export function schemaValidator<T>(validationSchema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = validationSchema.safeParse(req.body);
      if (!parsedData.success) {
        const errorMessage = z.prettifyError(parsedData.error);
        ResponseHelper.error.rejected("Validation Schema Rejected!");
        req.body = parsedData.data;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
