// services/userService.ts
import { Request, Response } from "express";
import User from "../auth/auth.model";
import UserDetails from "./user.model";
import Role from "../permistion/model/roles";

export const getUserOverview = async () => {
  const totalUsers = await User.count();
  const totalPatient = await Role.count({ where: { role_name: "patient" } });
  const totalDoctor = await Role.count({ where: { role_name: "doctor" } });
  const totalAdmin = await Role.count({ where: { role_name: "admin" } });

  const activeUsers = await User.count({ where: { active: true } });
  const activePatient = await Role.count({
    where: { role_name: "patient", active: true },
  });
  const activeDoctor = await Role.count({
    where: { role_name: "doctor", active: true },
  });

  // Tính tỉ lệ (nếu totalUsers = 0 thì trả về 0)
  const rateActiveUser = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;
  const rateActiveDoctor =
    totalDoctor > 0 ? (activeDoctor / totalDoctor) * 100 : 0;
  const rateActivePatient =
    totalPatient > 0 ? (activePatient / totalPatient) * 100 : 0;

  return {
    totalUsers,
    totalPatient,
    totalDoctor,
    totalAdmin,
    activeUsers,
    activePatient,
    activeDoctor,
    rateActiveUser,
    rateActiveDoctor,
    rateActivePatient,
  };
};

export const getUserDetailsService = async (id: string) => {
  const details = await UserDetails.findOne({
    where: { user_id: id },
  });

  if (!details) {
    throw new Error("User details not found");
  }

  return details;
};

export const updateUserDetailsService = async (id: string, data: object) => {
  const details = await UserDetails.findOne({ where: { user_id: id } });

  if (!details) {
    throw new Error("User details not found");
  }

  await details.update(data);
  return details;
};
