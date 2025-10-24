import { ApiResponse } from "../../../common/utils/ApiResponse";
import { Request, Response } from "express";
import logger from "../../../common/utils/logger";

/**
 * Get all patients
 * Validation is handled by Zod middleware before this controller runs
 */
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    // Logic to retrieve all patients
    return ApiResponse.success(res, "Patients retrieved successfully", {
      patients: [], // Replace with actual patient data
    });
  } catch (error: any) {
    const status = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    logger.error("Error retrieving patients", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, status, message);
  }
};
