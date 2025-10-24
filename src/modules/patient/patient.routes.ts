import { Router } from "express";
import {
  createPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  getPatientRecordsById,
  updatePatientById,
} from "./controllers";

export const patientRoutes = Router();

patientRoutes.get("/", getAllPatients);
patientRoutes.get("/records/:id", getPatientRecordsById);
patientRoutes.get("/:id", getPatientById);
patientRoutes.post("/", createPatient);
patientRoutes.put("/:id", updatePatientById);
patientRoutes.delete("/:id", deletePatientById);
