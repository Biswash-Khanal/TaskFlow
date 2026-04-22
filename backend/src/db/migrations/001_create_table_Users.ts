import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
  await db.schema
    .createTable("Users")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("name", "varchar(25)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("password_hash", "varchar(255)", (col) => col.notNull())
    .addColumn("avatar_initials", "varchar(4)", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await sql`
    CREATE OR REPLACE FUNCTION set_avatar_initials_on_insert()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.avatar_initials IS NULL OR NEW.avatar_initials = '' THEN
        NEW.avatar_initials := upper(substr(NEW.name, 1, 2));
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `.execute(db);

  // Attach the trigger to run only on INSERT
  await sql`
    CREATE TRIGGER users_initials_insert
    BEFORE INSERT ON "Users"
    FOR EACH ROW
    EXECUTE FUNCTION set_avatar_initials_on_insert();
  `.execute(db);

  //create trigger to run update date function
  await sql`
  create TRIGGER updated_at_update
  BEFORE UPDATE ON "Users"
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_date_on_change();
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
  await sql`DROP TRIGGER IF EXISTS updated_at_update ON "Users";`.execute(db);
  await sql`DROP TRIGGER IF EXISTS users_initials_insert ON "Users";`.execute(
    db,
  );
  await sql`DROP FUNCTION IF EXISTS set_avatar_initials_on_insert;`.execute(db);
  await db.schema.dropTable("Users").execute();
}
