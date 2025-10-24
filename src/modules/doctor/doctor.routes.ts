import { Router } from "express";
import {
  addDoctor,
  deleteDoctorById,
  getAllDoctors,
  getDoctorById,
  getDoctorReviews,
  updateDoctorById,
} from "./controllers";
import { validate } from "../../common/middlewares/validate.middleware";
import { createDoctorSchema } from "./doctor.validation";

export const doctorRoutes = Router();

doctorRoutes.post("/", validate(createDoctorSchema), addDoctor);

doctorRoutes.get("/", getAllDoctors);

doctorRoutes.get("/:doctorId", getDoctorById);

doctorRoutes.get("/:doctorId/reviews", getDoctorReviews);

doctorRoutes.put("/:doctorId", updateDoctorById);

doctorRoutes.delete("/:doctorId", deleteDoctorById);
