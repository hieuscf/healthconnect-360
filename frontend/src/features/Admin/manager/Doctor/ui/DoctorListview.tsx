import React from "react";
import { Edit, Trash2, Eye, Phone, Mail, Award, Star } from "lucide-react";
import type { Doctor } from "../model/types";

interface DoctorListViewProps {
  doctors: Doctor[];
  viewMode: "grid" | "list";
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: string) => void;
  onView: (doctor: Doctor) => void;
}

const DoctorListView: React.FC<DoctorListViewProps> = ({
  doctors,
  viewMode,
  onEdit,
  onDelete,
  onView,
}) => {
  const getDegreePrefix = (degree?: string): string => {
    if (!degree) return "";
    switch (degree.toLowerCase()) {
      case "bác sĩ":
        return "BS.";
      case "giáo sư":
        return "GS.";
      case "tiến sĩ":
        return "TS.";
      case "phó giáo sư":
        return "PGS.";
      default:
        return degree; // fallback giữ nguyên
    }
  };
  return (
    <>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Avatar + Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={doctor.avatar_image}
                    alt={doctor.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {`${getDegreePrefix(doctor.degree)} ${doctor.fullName}`}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {doctor.specialization}
                    </p>
                    {/* Rating */}
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({doctor.rating})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {doctor.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {doctor.phone}
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>{doctor.experience} năm kinh nghiệm</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Code:</span>
                  <span className="font-medium">{doctor.licenseNumber}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500">Làm việc tại:</span>
                  <span className="font-medium">{doctor.clinic}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => onView(doctor)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Xem chi tiết bác sĩ"
                >
                  <Eye className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onEdit(doctor)}
                  className="text-green-600 hover:text-green-800"
                  aria-label="Chỉnh sửa bác sĩ"
                >
                  <Edit className="h-4 w-4" />
                </button>

                <button
                  onClick={() => onDelete(doctor.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Xóa bác sĩ"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Chuyên khoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover mr-3"
                      src={doctor.avatar_image}
                      alt={doctor.fullName}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {`${getDegreePrefix(doctor.degree)} ${doctor.fullName}`}
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Award className="h-4 w-4" />
                        <span>{doctor.experience} năm kinh nghiệm</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {doctor.specialization}
                    </div>
                    <div className="text-xs text-gray-500"></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{doctor.email}</div>
                    <div>{doctor.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onView(doctor)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(doctor)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(doctor.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DoctorListView;
