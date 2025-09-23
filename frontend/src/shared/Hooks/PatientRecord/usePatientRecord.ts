import api from "../../config/axios";
import { notify } from "../../lib/Notifications";
import type { PatientRecord, PatientRecordStore } from "../../../features/Patient/PatientRecord/model/types";
import { create } from "zustand";
import type { AxiosError } from "axios";

export const usePatientStore = create<PatientRecordStore>((set) => ({
  patient: null,
  loading: false,
  error: null,

  // Lấy thông tin bệnh nhân theo user_id
  fetchPatient: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/api/patients/information/${id}`);
      set({ patient: res.data, loading: false });
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      set({
        error: error.response?.data?.message || "Lỗi khi tải dữ liệu",
        loading: false,
      });
      notify.error(error.response?.data?.message || "Lỗi khi tải dữ liệu");
    }
  },

  // Cập nhật thông tin bệnh nhân
  updatePatient: async (id: string, data: Partial<PatientRecord>) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/api/patients/information/${id}`, data);
      set({ patient: res.data, loading: false });
      notify.success("Cập nhật dữ liệu thành công");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      set({
        error: error.response?.data?.message || "Lỗi khi cập nhật dữ liệu",
        loading: false,
      });
      notify.error(error.response?.data?.message || "Lỗi khi cập nhật dữ liệu");
    }
  },

  // Xóa dữ liệu patient khi logout
  clearPatient: () => {
    set({ patient: null, loading: false, error: null });
  },
}));
