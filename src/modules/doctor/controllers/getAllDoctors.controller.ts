import { ApiResponse } from "@/common/utils/ApiResponse";
import { Request, Response } from "express";
import logger from "../../../common/utils/logger";

/**
 * Get all doctors
 * Validation is handled by Zod middleware before this controller runs
 */
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    // Logic to retrieve all doctors
    return ApiResponse.success(res, "Doctors retrieved successfully", {
      doctors: [], // Replace with actual doctor data
    });
  } catch (error: any) {
    const status = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    logger.error("Error retrieving doctors", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, status, message);
  }
};
