// features/user-overview/model/useUserOverview.ts
import { useEffect, useState } from "react";
import { type Doctor } from "./types";
import { getOverview } from "../api/api";

export const useDoctorOverview = () => {
  const [stats, setStats] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getOverview();
        setStats(data);
      } catch (err) {
        setError("Error fetching stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading, error };
};
