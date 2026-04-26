// services/auth.services.ts
import { db } from "../db/database";
import { UserNew, Users, UserSelect } from "../db/types";
import { errorResponse } from "../utils/ResponseHelpers";

export async function findUserByEmail(
  email: string,
): Promise<UserSelect | null> {
  const existingUser = await db
    .selectFrom("Users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  return existingUser ? existingUser : null;
}
export async function createUser(data: UserNew) {
  // 1. The "Check" - Look for existing users by email
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    errorResponse("This E-mail is in use already, Please Login instead"); // Use a simple code to identify the error
  }

  // 2. The "Insert"
  return await db
    .insertInto("Users")
    .values(data)
    .returning(["id", "name", "email"])
    .executeTakeFirst();
}
