import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format - keeps it clean and readable
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `${timestamp} [${level}]: ${message}`;

  // Add metadata if present (but not too verbose)
  if (Object.keys(meta).length > 0) {
    log += ` ${JSON.stringify(meta)}`;
  }

  // Add stack trace for errors
  if (stack) {
    log += `\n${stack}`;
  }

  return log;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // info, error only (moderate)
  format: combine(
    errors({ stack: true }), // Capture error stack traces
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // Console output (development)
    new winston.transports.Console({
      format: combine(
        colorize(), // Colorize for better readability in terminal
        logFormat
      ),
    }),

    // File output for errors only (production-ready)
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // File output for all logs (optional, can be disabled)
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

// Don't log to files in test environment
if (process.env.NODE_ENV === "test") {
  logger.transports.forEach((transport) => {
    if (transport instanceof winston.transports.File) {
      transport.silent = true;
    }
  });
}

export default logger;
