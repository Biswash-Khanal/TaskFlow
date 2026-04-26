import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/ResponseHelpers";

import {
  createUser,
  findUserByEmail,
} from "../services/auth.services";
import { compare, hash } from "bcryptjs";
import { UserSelect } from "../db/types";

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

    

    return successResponse(res, {});
  } catch (error) {
    next(error);
  }
}
