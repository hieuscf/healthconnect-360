import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { useUserStore } from "../model/userStore";
import { useAuthStore } from "../../auth/model/authStore";

const PersionalInfomation = () => {
  const { user, fetchUser, loading, updateUser } = useUserStore();
  const userId = useAuthStore((state) => state.user?.user_id);
  const email = useAuthStore((state) => state.user?.email);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<{
    age: string | number;
    birthday: string | Date;
    email: string;
    phone: string;
    citizen_id: string;
    health_insurance_id: string;
  }>({
    age: "",
    birthday: "",
    email: "",
    phone: "",
    citizen_id: "",
    health_insurance_id: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUser(userId); // load user theo id
    }
  }, [userId, fetchUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        age: user.age ? String(user.age) : "",
        birthday: user.birthday || "",
        email: email || "",
        phone: user.phone || "",
        citizen_id: user.citizen_id || "",
        health_insurance_id: user.health_insurance_id || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userId) return;
    await updateUser(userId, {
      ...formData,
      age: formData.age ? Number(formData.age) : undefined, // string -> number
      birthday: formData.birthday ? new Date(formData.birthday) : undefined,
    });
    setIsOpen(false);
  };
  const formatDateForInput = (date?: string | Date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 font-medium"
          onClick={() => setIsOpen(true)}
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
      </div>

      {/* Information Grid */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Age
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.age || "—"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Birthday
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user?.birthday
                ? new Date(user.birthday).toLocaleDateString("en-GB") // format DD/MM/YYYY
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Email address
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {email || "—"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Phone
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.phone || "—"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Citizen ID
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.citizen_id || "—"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Health Insurance ID
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.health_insurance_id || "—"}
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
              Edit Personal Info
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Age"
              />
              <input
                type="date"
                name="birthday"
                value={formatDateForInput(formData.birthday)}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Phone"
              />
              <input
                type="text"
                name="citizen_id"
                value={formData.citizen_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Citizen ID"
              />
              <input
                type="text"
                name="health_insurance_id"
                value={formData.health_insurance_id}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Health Insurance ID"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersionalInfomation;
