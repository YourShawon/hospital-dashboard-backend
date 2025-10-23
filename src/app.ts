import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import apiRouter from "./routes";
import { swaggerSpec } from "./config/swagger";

class App {
  public readonly app: Application;

  constructor() {
    this.app = express();
    this.registerMiddleware();
    this.registerRoutes();
    this.registerNotFound();
    this.registerErrorHandler();
  }

  private registerMiddleware() {
    const isProd = process.env.NODE_ENV === "production";

    // Core
    this.app.use(express.json({ limit: "1mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());

    // Dev logging
    if (!isProd) {
      this.app.use(morgan("dev"));
    }
  }

  private registerRoutes() {
    // Health check endpoint
    this.app.get("/health", (_req: Request, res: Response) => {
      res
        .status(200)
        .json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // API Documentation (Swagger UI)
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        customSiteTitle: "Hospital Dashboard API Docs",
        customCss: ".swagger-ui .topbar { display: none }",
      })
    );

    // Serve OpenAPI spec as JSON
    this.app.get("/api-docs.json", (_req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    // API routes
    this.app.use("/api/v1", apiRouter);
  }

  private registerNotFound() {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ message: "Not Found", path: req.originalUrl });
    });
  }

  // Basic centralized error handler
  private registerErrorHandler() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err?.status || 500;
        const message = err?.message || "Internal Server Error";
        const stack =
          process.env.NODE_ENV === "production" ? undefined : err?.stack;
        res.status(status).json({ message, status, stack });
      }
    );
  }

  // Expose a simple listen helper so main.ts can start the server.
  public listen(port: number): http.Server {
    const server = this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server ready at http://localhost:${port}`);
    });
    return server;
  }
}

export default App;
