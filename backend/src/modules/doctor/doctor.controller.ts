import { Request, Response } from "express";
import { createDoctorService , getDoctorsService ,updateDoctorService , deleteDoctorService} from "./doctor.service";

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      experience,
      specialization,
      degree,
      clinic,
      licenseNumber,
    } = req.body;

    const newDoctor = await createDoctorService({
      fullName: name,
      email,
      phone,
      experience,
      specialization,
      degree,
      clinic,
      licenseNumber,
    });

    res.status(201).json({
      message: "Tạo bác sĩ thành công",
      doctor: newDoctor,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await getDoctorsService();
    res.status(200).json(doctors);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedDoctor = await updateDoctorService(id, req.body);

    return res.status(200).json({
      message: "Cập nhật bác sĩ thành công",
      doctor: updatedDoctor,
    });
  } catch (error: any) {
    console.error("❌ Error updating doctor:", error);
    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Lỗi khi cập nhật bác sĩ" });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteDoctorService(id);

    return res.status(200).json({ message: "Xóa bác sĩ thành công" });
  } catch (error: any) {
    console.error("❌ Error deleting doctor:", error);

    if (error.message === "Doctor not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(400).json({ message: error.message || "Lỗi khi xóa bác sĩ" });
  }
};