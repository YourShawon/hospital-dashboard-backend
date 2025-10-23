import { ApiError } from "../../common/utils/ApiError";
import { CreateDoctorInput } from "./doctor.types";
import { IDoctorService } from "./interfaces/doctor.service.interface";
import { DoctorRepository } from "./doctor.repo";
import logger from "../../common/utils/logger";

const repo = new DoctorRepository();

export const DoctorService: IDoctorService = {
  addDoctor: async (data: CreateDoctorInput) => {
    logger.info("Creating new doctor", {
      email: data.email,
      department: data.department,
    });

    const existing = await repo.findByEmail(data.email);
    if (existing) {
      logger.warn("Doctor creation failed: email already exists", {
        email: data.email,
      });
      throw new ApiError(400, "Doctor already exists");
    }

    const created = await repo.create(data);
    logger.info("Doctor created successfully", {
      id: created.id,
      email: data.email,
    });

    return created; // { id }
  },
};
