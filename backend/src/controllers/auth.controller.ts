import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  createUser,
  doesUserExist,
  findUserByEmailForLogin,
} from "../services/auth.services";
import { compare, hash } from "bcryptjs";
import { UserSelect } from "../db/types";
import { env } from "../utils/env";
import { ResponseHelper } from "../utils/ResponseHelpers";

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

    const userExists = await doesUserExist("email", email);

    if (userExists) {
      return ResponseHelper.error.conflict(
        "Account with this email already exists!",
      );
    }

    const password_hash = await hash(password, 10);

    const result = await createUser({ name, email, password_hash });
    return ResponseHelper.success.created(
      res,
      result,
      "Registration Successful!",
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    //get the post request data, parsed as json already by express.json
    const body = req.body;

    //the structure is validated alrady throuhg the middleware so we are safe to destructure here
    const { email, password } = body;

    const user = await findUserByEmailForLogin(email);

    if (!user) {
      return ResponseHelper.error.notFound(
        "Account with this email was not found!",
      );
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      return ResponseHelper.error.rejected("Incorrect Password!");
    }

    const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
      expiresIn: "1h",
    });

    res.cookie("auth", token, {
      maxAge: 1 * 60 * 60 * 1000,
      httpOnly: true,
      secure: env.nodeEnv === "production",
    });

    const safeResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_initials: user.avatar_initials,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return ResponseHelper.success.authorized(
      res,
      safeResponse,
      "Logged in Successfully!",
    );
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("auth");
    return ResponseHelper.success.accepted(res, {}, "Logged out Successfully");
  } catch (error) {
    next(error);
  }
}
