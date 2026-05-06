import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { env } from "../utils/env";

export interface authPayload extends JwtPayload {
  userId: string;
}
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cookies = req.cookies;

    const decodedJWT = jwt.verify(
      cookies.auth,
      env.accessJwtSecret,
    ) as authPayload;

    req.userId = decodedJWT.userId;
    next();
  } catch (error) {
    next(error);
  }
}
