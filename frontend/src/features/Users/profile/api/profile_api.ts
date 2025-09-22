import api from "../../../../shared/config/axios";
import type { UserDetails } from "../model/profile_interface";
import { notify } from "../../../../shared/lib/Notifications"

export const getUserById = async (id: string): Promise<UserDetails> => {
  const res = await api.get(`/api/users/detail/${id}`);
  return res.data;
}; 

export const updateUserById = async (id: string,data:object): Promise<UserDetails> => {
  try {
    const res = await api.put(`/api/users/detail/${id}`,data);
    return res.data as UserDetails;
  } catch (error) {
    notify.error("Update not found!");
    throw error;
  }
}; 