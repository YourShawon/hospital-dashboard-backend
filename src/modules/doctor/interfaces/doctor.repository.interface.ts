import { CreateDoctorInput } from "../doctor.types";

export interface IDoctorRepository {
  findByEmail(email: string): Promise<{ id: string } | null>;
  create(data: CreateDoctorInput): Promise<{ id: string }>;
}
