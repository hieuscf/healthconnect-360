import { useState, useEffect } from "react";
import api from "../../config/axios";

interface Option {
  label: string;
  value: string;
}

export interface Specialization {
  specialization_id: string;
  specialization_name: string;
}

export const useSpecializations = () => {
  const [specializations, setSpecializations] = useState<Option[]>([
    { label: "Tất cả chuyên khoa", value: "all" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecializations = async () => {
      setLoading(true);
      try {
        const res = await api.get<Specialization[]>("/api/specialization/");
        const data: Option[] = res.data.map((s) => ({
          label: s.specialization_name,
          value: s.specialization_id, // dùng id làm value cho ổn định
        }));
        setSpecializations([
          { label: "Tất cả chuyên khoa", value: "all" },
          ...data,
        ]);
      } catch (err: unknown) {
        setError("Không thể tải danh sách chuyên khoa");
        console.error("Error fetching specializations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  return { specializations, loading, error };
};
