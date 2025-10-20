import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * Generic validation middleware using Zod schemas
 * Validates req.body against provided schema and returns detailed errors
 *
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the request body
      const parsed = schema.parse(req.body);

      // Replace req.body with parsed/sanitized data
      req.body = parsed;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors into readable messages
        const errors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      // Unexpected error
      return res.status(500).json({
        success: false,
        message: "Internal validation error",
      });
    }
  };
};
