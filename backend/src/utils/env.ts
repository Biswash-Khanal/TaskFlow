import { AppError } from "./AppError";

// env.ts
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new AppError(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  databaseUrl: requireEnv("DATABASE_URL"),
  accessJwtSecret: requireEnv("ACCESS_JWT_SECRET_KEY"),
  refreshJwtSecret: requireEnv("REFRESH_JWT_SECRET_KEY"),
  nodeEnv: requireEnv("NODE_ENV"),
};
