// services/auth.services.ts
import { db } from "../db/database";
import { UserNew, Users, UserSelect } from "../db/types";

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
  
  return await db
    .insertInto("Users")
    .values(data)
    .returning(["id", "name", "email"])
    .executeTakeFirst();
}
