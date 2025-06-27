"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.USERS = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    googleId: (0, pg_core_1.text)('google_id').unique().notNull(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    avatar: (0, pg_core_1.text)('avatar').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow().notNull(),
    age: (0, pg_core_1.integer)('age'),
});
