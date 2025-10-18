import { CreateDoctorInput } from "../doctor.types";

export interface IDoctorService {
  addDoctor(data: CreateDoctorInput): Promise<{ id: string }>;
}
