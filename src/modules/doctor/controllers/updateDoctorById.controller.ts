import { ApiResponse } from "../../../common/utils/ApiResponse";
import { Request, Response } from "express";
import logger from "../../../common/utils/logger";

/**
 * Update a doctor by ID
 * Validation is handled by Zod middleware before this controller runs
 */
export const updateDoctorById = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const updatedData = req.body;

    // Logic to update a doctor by ID
    return ApiResponse.success(res, "Doctor updated successfully", {
      doctor: {}, // Replace with actual updated doctor data
    });
  } catch (error: any) {
    const status = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    logger.error("Error updating doctor", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, status, message);
  }
};
