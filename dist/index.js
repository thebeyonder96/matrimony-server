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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./lib/logger");
const configs_1 = require("./configs");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const PORT = configs_1.ServerConfig.PORT || 7000;
/**
 * Start the server
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = (0, postgres_1.default)(configs_1.Database.DATABASE_URL, { prepare: false });
        const db = (0, postgres_js_1.drizzle)({ client });
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
