import { SERVER } from "./app";
import { LOGGER } from "./lib/logger";
import { Database, ServerConfig } from "./configs";
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const PORT = ServerConfig.PORT || 7000;

/**
 * Start the server
 */
const startServer = async () => {
  try {
    const client = postgres(Database.DATABASE_URL, { prepare: false })
    const db = drizzle({ client });
    LOGGER.info("Database connection successful");
  } catch (error) {
    LOGGER.error("Unable to connect to database:", error);
    process.exit(1);
  }

  SERVER.listen(PORT, () => {
    LOGGER.info(`Server is running on port ${PORT}`);
  });
};
startServer();
