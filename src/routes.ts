import { Router } from "express";
import { doctorRoutes } from "./modules/doctor/doctor.routes";
import { patientRoutes } from "./modules/patient/patient.routes";
import { appointmentRoutes } from "./modules/appointment/appointment.routes";
import { billingRoutes } from "./modules/billing/billing.routes";

const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

apiRouter.use("/doctors", doctorRoutes);
apiRouter.use("/patients", patientRoutes);
apiRouter.use("/appointments", appointmentRoutes);
apiRouter.use("/billings", billingRoutes);

export default apiRouter;
