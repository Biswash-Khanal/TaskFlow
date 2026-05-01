import { db } from "../db/database";
import { UserSelect } from "../db/types";

export async function fetchAllUsers(): Promise<
  Pick<UserSelect, "id" | "name" | "avatar_initials" | "email" | "created_at">[]
> {
  return await db
    .selectFrom("Users")
    .select(["id", "name", "avatar_initials", "email", "created_at"])
    .orderBy("name asc")
    .execute();
}
