import { ApiResponse } from "@/common/utils/ApiResponse";
import { Request, Response } from "express";
import logger from "../../../common/utils/logger";

/**
 * Get a doctor's reviews
 * Validation is handled by Zod middleware before this controller runs
 */
export const getDoctorReviews = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    // Logic to retrieve a doctor's reviews
    return ApiResponse.success(res, "Doctor's reviews retrieved successfully", {
      reviews: [], // Replace with actual reviews data
    });
  } catch (error: any) {
    const status = error?.statusCode || 500;
    const message = error?.message || "Internal Server Error";

    logger.error("Error retrieving doctor's reviews", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, status, message);
  }
};
