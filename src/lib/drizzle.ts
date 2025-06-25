import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Database } from '../configs';
import * as schema from '../db/schema';

const CLIENT = postgres(Database.DATABASE_URL, { prepare: false });
export const DB = drizzle(CLIENT, { schema });
