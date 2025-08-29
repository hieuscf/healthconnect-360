import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await AuthService.signup(email, password, role);
    console.log(email,password,role)
    res.status(201).json({success:true , message: "Đăng ký thành công", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await AuthService.signin(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
    
    res.status(200).json({
      success:true,
      message: "Đăng nhập thành công",
      accessToken,
      user,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken");
    const result = await AuthService.logout();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
