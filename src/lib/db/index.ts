import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is not defined");
}

const sql = neon(process.env.NEON_DATABASE_URL);
export const db = drizzle(sql);
