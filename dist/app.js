"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const logger_1 = require("./lib/logger");
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cors_1 = __importDefault(require("cors"));
require("./lib/passport");
const APP = (0, express_1.default)();
APP.use((0, helmet_1.default)());
APP.use((0, cookie_parser_1.default)());
APP.use(express_1.default.json({ limit: '1000kb' }));
APP.use((0, compression_1.default)());
APP.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
}));
/**
 * Health check
 */
APP.get("/", (req, res) => {
    res.send("Health OK!");
});
APP.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
APP.use(passport_1.default.initialize());
APP.use(passport_1.default.session());
APP.use('/api', routes_1.default);
APP.use('/auth', auth_route_1.default);
APP.get('/login', (_req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});
/**
 * Error handling middleware
 */
APP.use((err, req, res, next) => {
    console.log(err);
    logger_1.LOGGER.error(err);
    const message = err instanceof Error ? err.message : "Something went wrong!";
    res.status(500).json({ error: message });
});
process.on("unhandledRejection", (reason, promise) => {
    logger_1.LOGGER.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});
process.on("uncaughtException", (error) => {
    logger_1.LOGGER.error("Uncaught Exception:", error);
    process.exit(1);
});
exports.SERVER = (0, http_1.createServer)(APP);
