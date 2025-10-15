import { Router } from "express";
import addDoctor from "./controllers/addDoctor.controllers";

export const doctorRoutes = Router();

doctorRoutes.post("/", addDoctor);
