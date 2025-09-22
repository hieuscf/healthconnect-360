import React, { useState, useEffect } from "react";
import { Edit, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useUserStore } from "../model/userStore";
import { useAuthStore } from "../../../auth/model/authStore";
import api from "../../../../shared/config/axios";

const ProfileHeader = () => {
  const role = useAuthStore((state) => state.user?.role);
  const userId = useAuthStore((state) => state.user?.user_id); // lấy từ auth store
  const { user, fetchUser, loading, updateUser } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    avatar_image: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUser(userId); // truyền userId vào
    }
  }, [userId, fetchUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "Musharof Chowdhury",
        avatar_image: user.avatar_image || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userId) return;

    let avatarUrl = formData.avatar_image; // giữ avatar cũ mặc định

    // Nếu có ảnh mới thì upload lên Cloudinary
    if (selectedFile) {
      const uploadForm = new FormData();
      uploadForm.append("file", selectedFile);

      const res = await fetch("http://localhost:4000/api/users/uploadavatar", {
        method: "POST",
        body: uploadForm,
      });

      const data = await res.json();
      avatarUrl = data.url; // thay bằng ảnh mới
    }

    // Gửi update user (kể cả chỉ đổi tên)
    await updateUser(userId, {
      ...formData,
      avatar_image: avatarUrl,
    });

    setIsOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // ✅ lưu file thật để upload
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        avatar_image: previewUrl, // dùng preview trước khi upload
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          {/* Left side - Profile Info */}
          <div className="flex items-center gap-6">
            {/* Avatar with badge */}
            <div className="relative">
              <img
                src={user.avatar_image}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
            </div>
            {/* Profile text */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.full_name ? user.full_name : "Musharof Chowdhury"}
              </h1>
              <p className="text-gray-600 font-medium mb-1">
                {role
                  ? role.charAt(0).toUpperCase() + role.slice(1)
                  : "Patient"}
              </p>
            </div>
          </div>
          {/* Right side - Social Icons and Edit Button */}
          <div className="flex items-center gap-2">
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
              <Facebook size={18} />
            </button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <Twitter size={18} />
            </button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
              <Linkedin size={18} />
            </button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-all duration-200">
              <Instagram size={18} />
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 font-medium"
              onClick={() => setIsOpen(true)}
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay mờ */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Form */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl w-96 z-10">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>

            {/* Avatar preview with upload */}
            <div className="flex justify-center mb-4">
              <label className="relative cursor-pointer">
                <img
                  src={formData.avatar_image || "/default-avatar.png"}
                  alt="avatar preview"
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-gray-200 shadow-md"
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white rounded-full opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Đổi ảnh</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Form inputs */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Full name"
              />
            </div>

            {/* Action buttons */}
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

export default ProfileHeader;
