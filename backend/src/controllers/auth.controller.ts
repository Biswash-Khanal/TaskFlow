import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/ResponseHelpers";
import jwt from "jsonwebtoken";

import { createUser, findUserByEmail } from "../services/auth.services";
import { compare, hash } from "bcryptjs";
import { UserSelect } from "../db/types";
import { env } from "../utils/env";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //get the post request data, parsed as json already by express.json
    const body = req.body;

    //the structure is validated alrady throuhg the middleware so we are safe to destructure here
    const { name, email, password } = body;

    const password_hash = await hash(password, 10);

    const result = await createUser({ name, email, password_hash });

    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    //get the post request data, parsed as json already by express.json
    const body = req.body;

    //the structure is validated alrady throuhg the middleware so we are safe to destructure here
    const { email, password } = body;

    const user: UserSelect | null = await findUserByEmail(email);

    if (!user) {
      errorResponse(
        "Account with this E-mail doesnt Exist. Please Register instesd!",
      );
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      errorResponse("Incorrect Password!");
    }

    const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
      expiresIn: 1 * 60 * 60 * 100,
    });

    res.cookie("auth", token, {
      maxAge: 1 * 60 * 60 * 100,
      httpOnly: true,
      secure: env.nodeEnv === "production",
    });

    return successResponse(res, { userId: user.id });
  } catch (error) {
    next(error);
  }
}
