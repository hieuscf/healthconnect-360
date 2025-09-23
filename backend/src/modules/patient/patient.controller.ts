// controllers/patientController.ts
import { Request, Response } from "express";
import * as patientService from "./patient.service";

// Lấy thông tin bệnh nhân
export const getPatientInformation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getPatientInformation(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    return res.json(patient);
  } catch (err) {
    console.error("❌ getPatientInformation:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Cập nhật thông tin bệnh nhân
export const updatePatientInformation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await patientService.updatePatientInformation(id, data);

    if (!updated) {
      return res.status(404).json({ message: "Patient information not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error("❌ updatePatientInformation:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
