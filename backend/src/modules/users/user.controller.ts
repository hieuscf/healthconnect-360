// controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "./user.service";

export const getUserOverview = async (req: Request, res: Response) => {
  try {
    const data = await userService.getUserOverview();
    return res.json({success:true , data:data });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const details = await userService.getUserDetailsService(id);
    console.log(details);
    return res.json(details);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "User details not found") {
      return res.status(404).json({ message: err.message });
    }
    console.error("❌ Error getUserDetails:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const details = await userService.updateUserDetailsService(id,data);
    console.log(details);
    return res.json(details);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "User details not found") {
      return res.status(404).json({ message: err.message });
    }
    console.error("❌ Error updateUserDetails:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};