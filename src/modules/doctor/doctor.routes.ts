import { Router } from "express";
import { addDoctor } from "./controllers";
import { validate } from "../../common/middlewares/validate.middleware";
import { createDoctorSchema } from "./doctor.validation";

export const doctorRoutes = Router();

// POST /api/v1/doctors - Create a new doctor (with Zod validation)
doctorRoutes.post("/", validate(createDoctorSchema), addDoctor);
