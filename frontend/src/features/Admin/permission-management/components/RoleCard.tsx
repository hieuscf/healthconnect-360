// src/features/permission-management/ui/RoleCard.tsx
import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import type { Role, Permission } from "../model/types";
import { getPermissionName } from "../lib/utils";

interface Props {
  role: Role;
  permissions: Permission[];
  userCount: number;
  onEdit: (role: Role) => void;
  onDelete: (id: number) => void;
}

export const RoleCard: React.FC<Props> = ({
  role,
  permissions,
  userCount,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${role.color}`}
        >
          {role.name}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(role)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(role.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{role.description}</p>

      <h4 className="font-medium text-gray-900">Quyền hạn:</h4>
      <div className="max-h-32 overflow-y-auto mt-2">
        {role.permissions.length > 0 ? (
          role.permissions.map((permId) => (
            <div
              key={permId}
              className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded mb-1"
            >
              {getPermissionName(permissions, permId)}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">Chưa có quyền nào</p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">{userCount} người dùng</p>
      </div>
    </div>
  );
};
