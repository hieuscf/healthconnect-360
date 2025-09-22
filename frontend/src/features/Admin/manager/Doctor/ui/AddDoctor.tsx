import React, { useState, useEffect } from "react";
import api from "../../../../../shared/config/axios";
import { X, Save } from "lucide-react";
import { notify } from "../../../../../shared/lib/Notifications";
import type { DoctorForm, Doctor } from "../model/types";
import { useSpecializations } from "../../../../../shared/Hooks/Specializations/Specialization";

interface AddDoctorProps {
  doctor?: Doctor | null;
  onClose: () => void;
  onSave: (newDoctor: Doctor) => void;
}

const AddDoctor: React.FC<AddDoctorProps> = ({ doctor, onClose, onSave }) => {
  const { specializations, loading, error } = useSpecializations();

  const [formData, setFormData] = useState<DoctorForm>({
    id: "",
    name: "",
    email: "",
    phone: "",
    experience: 0,
    specialization: "",
    degree: "",
    clinic: "",
    licenseNumber: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        id: doctor.id,
        name: doctor.fullName,
        email: doctor.email,
        phone: doctor.phone,
        experience: doctor.experience,
        specialization: doctor.specialization,
        degree: doctor.degree,
        clinic: doctor.clinic,
        licenseNumber: doctor.licenseNumber,
      });
    }
  }, [doctor]);

  const handleSave = async () => {
    try {
      let response;

      if (formData.id) {
        // Update
        response = await api.put(`/api/doctors/${formData.id}`, formData);
        if (response.status === 200) {
          notify.success("Cập nhật bác sỹ thành công");
          onSave(response.data); // gửi luôn object mới
          onClose();
        }
      } else {
        // Create
        response = await api.post("/api/doctors", formData);
        if (response.status === 201) {
          notify.success("Tạo bác sỹ mới thành công");
          onSave(response.data); // gửi luôn object mới
          onClose();
        }
      }
    } catch (err) {
      console.error(err);
      notify.error("Không thể kết nối server");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-lg font-semibold text-white">
            {doctor ? "✏️ Chỉnh sửa thông tin bác sĩ" : "➕ Thêm bác sĩ mới"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Họ tên + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập email"
              />
            </div>
          </div>

          {/* Số điện thoại + Kinh nghiệm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Kinh nghiệm (năm)
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>

          {/* Chuyên khoa + Học vị */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Chuyên khoa
              </label>
              <select
                value={formData.specialization}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specialization: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Chọn chuyên khoa --</option>
                {loading && <option disabled>Đang tải...</option>}
                {error && <option disabled>{error}</option>}
                {!loading &&
                  !error &&
                  specializations.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Học vị
              </label>
              <select
                value={formData.degree}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, degree: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Chọn học vị --</option>
                <option value="Bác sĩ">Bác sĩ</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
                <option value="Phó Giáo sư">Phó Giáo sư</option>
                <option value="Giáo sư">Giáo sư</option>
              </select>
            </div>
          </div>

          {/* Nơi công tác + Số giấy phép */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nơi công tác
              </label>
              <input
                type="text"
                value={formData.clinic}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, clinic: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập nơi công tác"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Số giấy phép
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    licenseNumber: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số giấy phép"
              />
            </div>
          </div>

          {/* Trạng thái */}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
