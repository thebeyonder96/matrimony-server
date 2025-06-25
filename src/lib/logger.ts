import { createLogger, format, transports } from "winston";
import { DEVELOPMENT, ServerConfig } from "../configs";

const { combine, timestamp, printf, colorize } = format;

const upperCaseLevel = format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} - ${level} : ${message}.`;
});

export const LOGGER = createLogger({
  level: 'info',
  format: combine(
    upperCaseLevel(),
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    ServerConfig.NODE_ENV == DEVELOPMENT ? new transports.Console() :
      new transports.File({
        filename: 'logs/app.log',
        format: combine(
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          logFormat
        )
      })
  ],
});
