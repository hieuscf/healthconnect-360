import bcrypt from "bcrypt";
import AuthUser from "./auth.model";
import UserDetails  from "../users/user.model";
import Role from "../permistion/model/roles";
import UserRole from "../permistion/model/user_roles";
import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt";

export const signup = async (email: string, password: string) => {
  const existing = await AuthUser.findOne({ where: { email } });
  if (existing) {
    throw new Error("Email đã tồn tại");
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await AuthUser.create({
    email,
    password_hash: hash,
    active:true
  });

  const patientRole = await Role.findOne({ where: { role_name: "Patient" } });
  if (patientRole) {
    await UserRole.create({
      user_id: user.user_id,
      role_id: patientRole.role_id,
    });
  }

  // 2. Tạo UserDetails rỗng/mặc định gắn với user_id
  await UserDetails.create({
    user_id: user.user_id,
    full_name: "",
    avatar_image: process.env.AVATAR || "https://res.cloudinary.com/dwtuyzsl5/image/upload/v1757610785/avatar-icon_l51bse.avif",
    phone: "",
    citizen_id: "",
    health_insurance_id: null,
    country: "",
    city: "",
    postal_code: null,
    tax_id: null,
  });

  return {
    user_id: user.user_id,
    email: user.email,
    role: "Patient",
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

  const payload = { user_id: user.user_id, email: user.email };
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
