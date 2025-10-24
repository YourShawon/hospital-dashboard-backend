import { ApiResponse } from "@/common/utils/ApiResponse";
import { Request, Response } from "express";
import logger from "../../../common/utils/logger";

/**
 * Get a doctor by ID
 * Validation is handled by Zod middleware before this controller runs
 */
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    // Logic to retrieve a doctor by ID
    return ApiResponse.success(res, "Doctor retrieved successfully", {
      doctor: {}, // Replace with actual doctor data
    });
  } catch (error: any) {
    const status = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    logger.error("Error retrieving doctor", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, status, message);
  }
};
