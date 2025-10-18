import { Request, Response } from "express";
import { DoctorService } from "../doctor.service";
import { CreateDoctorInput } from "../doctor.types";

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<CreateDoctorInput>;
    if (!body?.email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!body?.firstName || !body?.lastName) {
      return res
        .status(400)
        .json({ message: "firstName and lastName are required" });
    }
    if (!body?.department || !body?.gender || !body?.bio || !body?.phone) {
      return res
        .status(400)
        .json({ message: "department, gender, bio and phone are required" });
    }

    const result = await DoctorService.addDoctor(body as CreateDoctorInput);
    return res.status(201).json({ id: result.id, message: "Doctor created" });
  } catch (err: any) {
    const status = err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
    return res.status(status).json({ message });
  }
};
