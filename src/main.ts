import "dotenv/config";
import App from "./app";
import logger from "./common/utils/logger";

const PORT = Number(process.env.PORT) || 3000;

// Start application
logger.info("Starting Hospital Dashboard API", {
  env: process.env.NODE_ENV || "development",
  port: PORT,
});

const app = new App();
const server = app.listen(PORT);

logger.info("Server started successfully", {
  url: `http://localhost:${PORT}`,
  docs: `http://localhost:${PORT}/api-docs`,
});

// Graceful shutdown
const shutdown = (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(() => {
    logger.info("HTTP server closed successfully");
    process.exit(0);
  });

  // Fallback: force exit if close hangs
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10_000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason });
  process.exit(1);
});
