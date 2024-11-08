import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, { schema, logger: true });
