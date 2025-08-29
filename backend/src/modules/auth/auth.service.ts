import bcrypt from "bcrypt";
import AuthUser from "./auth.model";
import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt";

export const signup = async (email: string, password: string, role: "patient" | "doctor" | "admin") => {
  const existing = await AuthUser.findOne({ where: { email } });
  if (existing) {
    throw new Error("Email đã tồn tại");
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await AuthUser.create({
    email,
    password_hash: hash,
    role_name: role || "patient",
  });

  return {
    user_id: user.user_id,
    email: user.email,
    role: user.role_name,
  };
};

export const signin = async (email: string, password: string) => {
  const user = await AuthUser.findOne({ where: { email } });
  if (!user) {
    throw new Error("Email không tồn tại");
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error("Mật khẩu không đúng");
  }

  const payload = { user_id: user.user_id, email: user.email, role: user.role_name };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: payload,
  };
};

export const logout = async () => {
  // Nếu dùng refresh token trong DB thì xóa ở đây
  return { success: true, message: "Đăng xuất thành công" };
};
