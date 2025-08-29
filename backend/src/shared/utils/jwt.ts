import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ file .env

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // bạn nên tách riêng refresh

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}
if (!JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET environment variable is not defined");
}

// Thời hạn có thể chỉnh tùy dự án
const ACCESS_TOKEN_EXPIRES = "1h";
const REFRESH_TOKEN_EXPIRES = "7d";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
};

interface JwtPayload {
  user_id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new Error("Access token không hợp lệ hoặc đã hết hạn");
  }
};