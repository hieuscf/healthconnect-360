import { create } from "zustand";
import type { UserDetails, UserStore } from "./profile_interface";
import { getUserById, updateUserById } from "../api/profile_api";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  // Lấy user theo id
  fetchUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getUserById(id);
      set({ user: data, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: String(err), loading: false });
      }
    }
  },

  // Cập nhật user theo id
  updateUser: async (id: string, data: Partial<UserDetails>) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateUserById(id, data);
      if (updated) {
        set({ user: updated, loading: false });
      } else {
        set({ error: "Update failed", loading: false });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: String(err), loading: false });
      }
    }
  },
}));
