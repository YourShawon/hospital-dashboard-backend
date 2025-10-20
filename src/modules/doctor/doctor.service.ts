import { ApiError } from "../../common/utils/ApiError";
import { CreateDoctorInput } from "./doctor.types";
import { IDoctorService } from "./interfaces/doctor.service.interface";
import { DoctorRepository } from "./doctor.repo";

const repo = new DoctorRepository();

export const DoctorService: IDoctorService = {
  addDoctor: async (data: CreateDoctorInput) => {
    const existing = await repo.findByEmail(data.email);
    if (existing) throw new ApiError(400, "Doctor already exists");
    const created = await repo.create(data);
    return created; // { id }
  },
};
