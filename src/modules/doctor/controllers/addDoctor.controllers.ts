import { Request, Response } from "express";

function addDoctor(req: Request, res: Response) {
  res.end("Doctor added");
}

export default addDoctor;
