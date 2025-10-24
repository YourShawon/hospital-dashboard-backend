import { ApiResponse } from "@/common/utils/ApiResponse";
import { Request, Response } from "express";
import logger from "../../../common/utils/logger";

/**
 * Delete a doctor record by ID
 * Validation is handled by Zod middleware before this controller runs
 */
export const deleteDoctorById = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    // Logic to delete the doctor by ID
    return ApiResponse.created(res, "Doctor deleted successfully", {
      id: doctorId,
    });
  } catch (error: any) {
    const status = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    logger.error("Error deleting doctor", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, status, message);
  }
};
