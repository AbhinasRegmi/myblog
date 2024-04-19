import "dotenv/config";
import type {Config} from "drizzle-kit";

export default {
  schema: "./db/schemas",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRESQL_DB_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;