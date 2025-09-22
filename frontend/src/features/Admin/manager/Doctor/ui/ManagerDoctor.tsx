import React, { useState, useMemo } from "react";
import DoctorListView from "./DoctorListview";
import type { Doctor } from "../model/types";
import { AdminFilters } from "../../../../../shared/ui/AdminFilters/AdminFilters";
import AddDoctor from "./AddDoctor";
import { useSpecializations } from "../../../../../shared/Hooks/Specializations/Specialization";
import { useDoctors } from "../../../../../shared/Hooks/Doctor/useDoctors";

interface Option {
  label: string;
  value: string;
}

const ManagerDoctor: React.FC = () => {
  const { doctors, loadDoctors, deleteDoctor } = useDoctors();
  const {
    specializations,
    loading: specLoading,
    error: specError,
  } = useSpecializations();

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Convert specializations to options (cho filter)
  const specializationOptions: Option[] = useMemo(() => {
    if (specLoading) return [{ label: "Đang tải...", value: "loading" }];
    if (specError) return [{ label: "Lỗi tải chuyên khoa", value: "error" }];
    return specializations || [];
  }, [specializations, specLoading, specError]);

  // Lọc danh sách bác sĩ
  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSearch =
        d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        d.email?.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "all" || d.specialization === specialization;

      const matchesStatus = status === "all" || d.status === status;

      return matchesSearch && matchesSpecialization && matchesStatus;
    });
  }, [doctors, search, specialization, status]);

  // Khi lưu trong modal
  const handleSave = () => {
    loadDoctors();
    setOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-white space-y-6 p-6">
      <AdminFilters
        searchTerm={search}
        onSearchChange={setSearch}
        fields={[
          {
            name: "specialization",
            label: "Chuyên khoa",
            value: specialization,
            onChange: setSpecialization,
            options: specializationOptions,
          },
        ]}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        addLabel="Thêm bác sĩ mới"
        onAdd={() => {
          setSelectedDoctor(null);
          setOpen(true);
        }}
      />

      <DoctorListView
        doctors={filteredDoctors}
        viewMode={viewMode}
        onEdit={(doc) => {
          setSelectedDoctor(doc);
          setOpen(true);
        }}
        onDelete={(id) => deleteDoctor(id)}
        onView={(doc) => alert(`View ${doc.fullName}`)}
      />

      {open && (
        <AddDoctor
          doctor={selectedDoctor}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManagerDoctor;
