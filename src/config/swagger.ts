import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Hospital Dashboard API",
    version: "1.0.0",
    description:
      "REST API for hospital management system with doctor, patient, appointment, and billing modules",
    contact: {
      name: "API Support",
      email: "support@hospital.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Development server",
    },
    {
      url: "https://your-azure-app.azurewebsites.net/api/v1",
      description: "Production server (Azure)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Error message",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/**/*.routes.ts", "./src/**/*.controller.ts"], // Files with JSDoc annotations
};

export const swaggerSpec = swaggerJsdoc(options);
