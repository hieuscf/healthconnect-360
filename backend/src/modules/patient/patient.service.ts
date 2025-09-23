import { Request, Response } from "express";
import User from "../auth/auth.model";
import Patient from "./patient.model";


export const getPatientInformation = async (id: string) => {
  const information = await Patient.findOne({
    where: { user_id: id },
  });

  if (!information) {
    throw new Error("Patient information not found");
  }

  return information;
};

export const updatePatientInformation = async (id: string, data: object) => {
  const information = await Patient.findOne({ where: { user_id: id } });

  if (!information) {
    throw new Error("Patient information not found");
  }

  await information.update(data);
  return information;
};
