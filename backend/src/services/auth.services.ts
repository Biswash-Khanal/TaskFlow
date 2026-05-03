// services/auth.services.ts
import { db } from "../db/database";
import { UserNew, Users, UserSelect } from "../db/types";

export async function doesUserExist(field: "id" | "email", value: string) {
  const existingUser = await db
    .selectFrom("Users")
    .select([
      "id",
      "name",
      "email",
      "avatar_initials",
      "created_at",
      "updated_at",
    ])
    .where(field, "=", value);

  return existingUser ? true : false;
}

export async function findUserByEmailForLogin(email: string) {
  const existingUser = await db
    .selectFrom("Users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  return existingUser ? existingUser : null;
}

//Takes data = {name, email, password_hash}, returns {id, name, email}
export async function createUser(data: UserNew) {
  return await db
    .insertInto("Users")
    .values(data)
    .returning(["id", "name", "email"])
    .executeTakeFirst();
}
