"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./lib/logger");
const configs_1 = require("./configs");
const prisma_1 = require("./lib/prisma");
const PORT = configs_1.ServerConfig.PORT || 7000;
/**
 * Start the server
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.PRISMA.$connect();
        logger_1.LOGGER.info("Database connection successful");
    }
    catch (error) {
        logger_1.LOGGER.error("Unable to connect to database:", error);
        process.exit(1);
    }
    app_1.SERVER.listen(PORT, () => {
        logger_1.LOGGER.info(`Server is running on port ${PORT}`);
    });
});
startServer();
