import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";
import { DB } from "../types";
import { env } from "../../utils/env";


function createMigrator() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: env.databaseUrl,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../migrations"),
    }),
  });

  return { db, migrator };
}

async function migrateToLatest() {
  const { db, migrator } = createMigrator();
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    console.log(`${it.migrationName}: ${it.status}`);
  });

  if (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  await db.destroy();
}

async function migrateDown() {
  const { db, migrator } = createMigrator();
  const { error, results } = await migrator.migrateDown();

  results?.forEach((it) => {
    console.log(`Rolled back ${it.migrationName}: ${it.status}`);
  });

  if (error) {
    console.error("Rollback failed:", error);
    process.exit(1);
  }

  await db.destroy();
}

// Decide action based on CLI arg
const action = process.argv[2]; // e.g. "up" or "down"

if (action === "down") {
  migrateDown();
} else {
  migrateToLatest();
}
