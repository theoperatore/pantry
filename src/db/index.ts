import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { type DB } from './types';

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.SUPABASE_CA
        ? {
            ca: process.env.SUPABASE_CA,
          }
        : false,
    }),
  }),
});
