import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  user_id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (token: string) => void;
  logout: () => void;
  initialize: () => void;
  refreshToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: (token: string) => {
    const decoded = jwtDecode<User>(token);
    localStorage.setItem("accessToken", token);
    set({
      user: decoded,
      accessToken: token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  initialize: () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        set({
          user: decoded,
          accessToken: token,
          isAuthenticated: true,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        localStorage.removeItem("accessToken");
      }
    }
  },

  refreshToken: async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to refresh");

      const data = await res.json();
      const token = data.accessToken;
      const decoded = jwtDecode<User>(token);

      localStorage.setItem("accessToken", token);

      set({
        user: decoded,
        accessToken: token,
        isAuthenticated: true,
      });

      return token;
    } catch (err) {
      console.error("Refresh token error:", err);
      localStorage.removeItem("accessToken");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
      return null;
    }
  },
}));
