import { useEffect, useState } from "react";
import api from "../../config/axios";
import { notify } from "../../lib/Notifications";
import type { Doctor } from "../../../features/Admin/manager/Doctor/model/types";

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load danh sách bác sĩ
  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/doctors");
      setDoctors(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        notify.error(err.message);
      } else {
        setError("Có lỗi xảy ra khi tải danh sách bác sĩ");
        notify.error("Có lỗi xảy ra khi tải danh sách bác sĩ");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // Xóa bác sĩ
  const deleteDoctor = async (id: string) => {
    try {
      setLoading(true);
      const res = await api.delete(`/api/doctors/${id}`);
      notify.success(res.data.message || "Xóa bác sĩ thành công");
      // Cập nhật danh sách ngay tại frontend mà không cần reload
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        notify.error(err.message);
      } else {
        notify.error("Có lỗi xảy ra khi xóa bác sĩ");
      }
    } finally {
      setLoading(false);
    }
  };

  return { doctors, loading, error, loadDoctors, deleteDoctor };
}
