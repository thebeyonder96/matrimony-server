"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGER = void 0;
const winston_1 = require("winston");
const configs_1 = require("../configs");
const { combine, timestamp, printf, colorize } = winston_1.format;
const upperCaseLevel = (0, winston_1.format)((info) => {
    info.level = info.level.toUpperCase();
    return info;
});
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level} : ${message}.`;
});
exports.LOGGER = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(upperCaseLevel(), colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        configs_1.ServerConfig.NODE_ENV == configs_1.DEVELOPMENT ? new winston_1.transports.Console() :
            new winston_1.transports.File({
                filename: 'logs/app.log',
                format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat)
            })
    ],
});
