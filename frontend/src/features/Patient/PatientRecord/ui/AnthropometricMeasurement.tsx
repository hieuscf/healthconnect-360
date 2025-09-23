import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { usePatientStore } from "../../../../shared/Hooks/PatientRecord/usePatientRecord";
import { useAuthStore } from "../../../auth/model/authStore";

const AnthropometricMeasurement = () => {
  const { patient, fetchPatient, updatePatient, loading } = usePatientStore();
  const userId = useAuthStore((state) => state.user?.user_id);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    height: 0,
    weight: 0,
    blood_group: "",
  });

  // fetch dữ liệu khi có userId
  useEffect(() => {
    if (userId) {
      fetchPatient(userId);
    }
  }, [userId, fetchPatient]);

  // set formData khi patient thay đổi
  useEffect(() => {
    if (patient) {
      setFormData({
        height: patient.height || 0,
        weight: patient.weight || 0,
        blood_group: patient.blood_group || "",
      });
    }
  }, [patient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (userId) {
      await updatePatient(userId, formData);
      setIsOpen(false);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!patient) return <p>Không có dữ liệu bệnh nhân</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Chỉ số nhân trắc học
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 font-medium"
          onClick={() => setIsOpen(true)}
        >
          <Edit size={16} />
          <span>Sửa</span>
        </button>
      </div>

      {/* Information Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Chiều cao
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {patient.height ? `${patient.height} cm` : "—"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Cân nặng
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {patient.weight ? `${patient.weight} kg` : "—"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Nhóm máu
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {patient.blood_group || "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-white p-6 rounded-xl shadow-xl w-96 z-10">
            <h2 className="text-xl font-bold mb-4 text-center">
              Cập nhật chỉ số nhân trắc học
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Chiều cao (cm)"
              />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Cân nặng (kg)"
              />
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Chọn nhóm máu</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnthropometricMeasurement;
