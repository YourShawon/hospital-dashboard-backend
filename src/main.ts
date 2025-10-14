import "dotenv/config";
import App from "./app";

const PORT = Number(process.env.PORT) || 3000;

const app = new App();
const server = app.listen(PORT);

// Graceful shutdown
const shutdown = (signal: string) => {
  // eslint-disable-next-line no-console
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log("HTTP server closed.");
    process.exit(0);
  });
  // Fallback: force exit if close hangs
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
