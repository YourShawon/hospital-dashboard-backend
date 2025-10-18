import { Router } from "express";
import { addDoctor } from "./controllers";

export const doctorRoutes = Router();

doctorRoutes.post("/", addDoctor);
