import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { env } from "../utils/env";
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cookies = req.cookies;

    jwt.verify(cookies.auth, env.jwtSecret);

    next();
  } catch (error) {
    next(error);
  }
}
