import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  createUser,
  doesUserExist,
  findUserByEmailForLogin,
  getUserById,
} from "../services/auth.services";
import { compare, hash } from "bcryptjs";
import { UserSelect } from "../db/types";
import { env } from "../utils/env";
import { ResponseHelper } from "../utils/ResponseHelpers";
import { StringValidation } from "zod/v3";
import { authPayload } from "../middleware/authenticator";

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

    const Accesstoken = jwt.sign({ userId: user.id }, env.accessJwtSecret, {
      expiresIn: "15m",
    });
    const RefreshToken = jwt.sign({ userId: user.id }, env.refreshJwtSecret, {
      expiresIn: "7d",
    });

    res.cookie("auth", Accesstoken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: env.nodeEnv === "production",
    });
    res.cookie("refreshAuth", RefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
    res.clearCookie("refreshAuth");
    return ResponseHelper.success.accepted(res, {}, "Logged out Successfully");
  } catch (error) {
    next(error);
  }
}
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const verifiedRefreshToken = jwt.verify(
      req.cookies.refreshAuth,
      env.refreshJwtSecret,
    ) as authPayload;

    const Accesstoken = jwt.sign(
      { userId: verifiedRefreshToken.userId },
      env.accessJwtSecret,
      {
        expiresIn: "15m",
      },
    );

    res.clearCookie("auth");
    res.cookie("auth", Accesstoken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: env.nodeEnv === "production",
    });

    return ResponseHelper.success.accepted(
      res,
      "Refreshed access token successfully!",
    );
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    if (!userId) {
      return ResponseHelper.error.unauthorized("Not authorized");
    }
    const result = await getUserById(userId);
    return ResponseHelper.success.authorized(
      res,
      result,
      "User data retrieved successfully",
    );
  } catch (error) {
    next(error);
  }
}
