import { Request, Response } from "express";
import * as PermissionService from "./permission.service";

export const createNewRole = async (req: Request, res: Response) => {
  try {
    const { role_name } = req.body;
    const user = await PermissionService.createNewRoleService(role_name);
    console.log(role_name)
    res.status(201).json({success:true , message: "tạo role thành công", role_name });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
