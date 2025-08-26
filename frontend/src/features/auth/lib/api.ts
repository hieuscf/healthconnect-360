import api from "../../../shared/config/axios";
import axios from "axios";

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData) => {
  try {
    const response = await api.post("/api/auth/signup", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = (error.response.data as { message: string }).message;
      throw new Error(errorMessage || "Đã có lỗi xảy ra khi đăng ký.");
    }
    throw new Error("Đã có lỗi không mong muốn xảy ra.");
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const response = await api.post("/api/auth/signin", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = (error.response.data as { message: string }).message;
      throw new Error(errorMessage || "Đã có lỗi xảy ra khi đăng nhập.");
    }
    throw new Error("Đã có lỗi không mong muốn xảy ra.");
  }
};

