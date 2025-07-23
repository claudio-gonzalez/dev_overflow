// logger.ts
import pino, { Logger } from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const baseOptions = {
  level: process.env.LOG_LEVEL || "info",
  formatters: {
    level: (label: string) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

const pinoLogger: Logger =
  isEdge || isProduction
    ? pino(baseOptions)
    : pino(baseOptions, pino.destination(1));

// Wrapper logger with pretty `console.log` in dev
const logger: Logger = {
  ...pinoLogger,
  info: (...args: Parameters<Logger["info"]>) => {
    pinoLogger.info(...args);
    if (!isProduction && !isEdge) {
      args.forEach((arg) =>
        console.log(
          "[INFO]",
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
      );
    }
  },
  error: (...args: Parameters<Logger["error"]>) => {
    pinoLogger.error(...args);
    if (!isProduction && !isEdge) {
      args.forEach((arg) =>
        console.error(
          "[ERROR]",
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
      );
    }
  },
  warn: (...args: Parameters<Logger["warn"]>) => {
    pinoLogger.warn(...args);
    if (!isProduction && !isEdge) {
      args.forEach((arg) =>
        console.warn(
          "[WARN]",
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
      );
    }
  },
  debug: (...args: Parameters<Logger["debug"]>) => {
    pinoLogger.debug(...args);
    if (!isProduction && !isEdge) {
      args.forEach((arg) =>
        console.debug(
          "[DEBUG]",
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
      );
    }
  },
} as Logger;

export default logger;
