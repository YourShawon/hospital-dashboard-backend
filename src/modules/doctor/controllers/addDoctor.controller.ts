import { Request, Response } from "express";
import { DoctorService } from "../doctor.service";
import { CreateDoctorInput } from "../doctor.types";
import { ApiResponse } from "../../../common/utils/ApiResponse";
import logger from "../../../common/utils/logger";

/**
 * Create a new doctor
 * Validation is handled by Zod middleware before this controller runs
 */
export const addDoctor = async (req: Request, res: Response) => {
  try {
    // req.body is already validated and typed by Zod middleware
    const doctorData = req.body as CreateDoctorInput;

    const result = await DoctorService.addDoctor(doctorData);

    return ApiResponse.created(res, "Doctor created successfully", {
      id: result.id,
    });
  } catch (err: any) {
    const status = err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";

    // Log errors (moderate level - just the essentials)
    logger.error("Error creating doctor", {
      error: message,
      statusCode: status,
      email: req.body?.email,
    });

    return ApiResponse.error(res, message, status);
  }
};
