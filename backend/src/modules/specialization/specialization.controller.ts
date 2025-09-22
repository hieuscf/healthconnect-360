import { Request, Response } from "express";
import * as SpecializationService from "./specialization.service";

export const getSpecializations = async (req: Request, res: Response) => {
  const result = await SpecializationService.getListSpecializationServices();
  if (result.success) {
    console.log(result.data)
    return res.status(200).json(result.data);
  } else {
    return res.status(500).json({ message: result.message });
  }
};

