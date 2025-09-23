import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { usePatientStore } from "../../../../shared/Hooks/PatientRecord/usePatientRecord";
import { useAuthStore } from "../../../auth/model/authStore";

const ClinicalParameters = () => {
  const { patient, fetchPatient, updatePatient, loading } = usePatientStore();
  const userId = useAuthStore((state) => state.user?.user_id);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    allergies: "",
    chronic_conditions: "",
    medical_history: "",
    current_medications: "",
    vaccinations: "",
  });

  // Fetch dữ liệu khi có userId
  useEffect(() => {
    if (userId) fetchPatient(userId);
  }, [userId, fetchPatient]);

  // Set formData khi patient thay đổi
  useEffect(() => {
    if (patient) {
      setFormData({
        allergies: patient.allergies || "",
        chronic_conditions: patient.chronic_conditions || "",
        medical_history: patient.medical_history || "",
        current_medications: patient.current_medications || "",
        vaccinations: patient.vaccinations || "",
      });
    }
  }, [patient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          Thông tin lâm sàng
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 font-medium"
          onClick={() => setIsOpen(true)}
        >
          <Edit size={16} />
          <span>Sửa</span>
        </button>
      </div>

      {/* Grid thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Dị ứng
          </label>
          <div className="text-gray-900">{patient.allergies || "—"}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Tình trạng mãn tính
          </label>
          <div className="text-gray-900">
            {patient.chronic_conditions || "—"}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Tiền sử bệnh
          </label>
          <div className="text-gray-900">{patient.medical_history || "—"}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Thuốc đang dùng
          </label>
          <div className="text-gray-900">
            {patient.current_medications || "—"}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Tiêm chủng
          </label>
          <div className="text-gray-900">{patient.vaccinations || "—"}</div>
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
              Cập nhật thông tin lâm sàng
            </h2>

            <div className="flex flex-col gap-3">
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Dị ứng"
              />
              <textarea
                name="chronic_conditions"
                value={formData.chronic_conditions}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Tình trạng mãn tính"
              />
              <textarea
                name="medical_history"
                value={formData.medical_history}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Tiền sử bệnh"
              />
              <textarea
                name="current_medications"
                value={formData.current_medications}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Thuốc đang dùng"
              />
              <textarea
                name="vaccinations"
                value={formData.vaccinations}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Tiêm chủng"
              />
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

export default ClinicalParameters;
