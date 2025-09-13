import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { useUserStore } from "../model/userStore";
import { useAuthStore } from "../../auth/model/authStore";

const ProfileAddress = () => {
  const { user, fetchUser, loading, updateUser } = useUserStore();
  const userId = useAuthStore((state) => state.user?.user_id);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    postal_code: "",
    tax_id: "",
  });

  // Lấy user từ backend
  useEffect(() => {
    if (userId) fetchUser(userId);
  }, [userId, fetchUser]);

  // Cập nhật form khi user có dữ liệu
  useEffect(() => {
    if (user) {
      setFormData({
        country: user.country || "",
        city: user.city || "",
        postal_code: user.postal_code || "",
        tax_id: user.tax_id || "",
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
    });

    setIsOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Address</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 font-medium"
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
              Country
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.country || "-"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              City/State
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.city || "-"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Postal Code
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.postal_code || "-"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              TAX ID
            </label>
            <div className="text-gray-900 font-semibold text-base">
              {user.tax_id || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Form */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl w-96 z-10">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Address</h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City/State"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="Postal Code"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleChange}
                placeholder="TAX ID"
                className="border border-gray-300 rounded-lg px-3 py-2"
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

export default ProfileAddress;
