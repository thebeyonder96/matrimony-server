import { SERVER } from "./app";
import { LOGGER } from "./lib/logger";
import { ServerConfig } from "./configs";
import { PRISMA } from "./lib/prisma";

const PORT = ServerConfig.PORT || 7000;

/**
 * Start the server
 */
const startServer = async () => {
  try {
    await PRISMA.$connect()
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
