import { NextFunction, Request, Response } from "express";
import { db } from "../db/database";
import { AppError } from "../utils/AppError";
import { errorResponse, successResponse } from "../utils/ResponseHelpers";
import { safeParse } from "zod";
import { userSchema } from "../schemas/validators/users.validators";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body;

    const { name, email, password } = body;

    let duplicateEntry = await db
      .selectFrom("Users")
      .selectAll()
      .where("Users.email", "=", email)
      .executeTakeFirst();

    if (duplicateEntry) {
      return errorResponse("Record with same E-mail already Exists!", 400);
    }

    duplicateEntry = await db
      .selectFrom("Users")
      .selectAll()
      .where("Users.name", "=", name)
      .executeTakeFirst();

    if (duplicateEntry) {
      return errorResponse("Username Taken", 400);
    }

    const result = await db
      .insertInto("Users")
      .values({
        name: name,
        email: email,
        password_hash: password,
        avatar_initials: "",
      })
      .returningAll()
      .executeTakeFirst();

    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
}
