// src/utils/axiosConfig.ts
import axios from "axios";
import { useAuthStore } from "../../features/auth/model/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 👉 Thêm accessToken vào header trước mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Tự động refresh token nếu accessToken hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken } = useAuthStore.getState();

    // Nếu bị lỗi 401 và chưa từng retry
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken(); // gọi store để refresh token
        if (newToken) {
          // Gắn token mới vào header và gửi lại request ban đầu
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
