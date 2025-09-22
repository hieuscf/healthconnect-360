// src/features/permission-management/ui/UserTable.tsx
import React from "react";
import { UserPlus } from "lucide-react";
import type { User, Role, Permission } from "../model/types";
import {
  getRoleName,
  getRoleColor,
  getUserPermissions,
  getPermissionName,
} from "../lib/utils";

interface Props {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  onManageRole: (user: User) => void;
}

export const UserTable: React.FC<Props> = ({
  users,
  roles,
  permissions,
  onManageRole,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Người dùng
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Roles
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Quyền hạn
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {user.roleIds.map((roleId) => (
                    <span
                      key={roleId}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                        roles,
                        roleId
                      )}`}
                    >
                      {getRoleName(roles, roleId)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">
                  {getUserPermissions(roles, user).length} quyền
                  <div className="text-xs text-gray-400 truncate">
                    {getUserPermissions(roles, user)
                      .slice(0, 2)
                      .map((p) => getPermissionName(permissions, p))
                      .join(", ")}
                    {getUserPermissions(roles, user).length > 2 && "..."}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onManageRole(user)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <UserPlus className="w-4 h-4" />
                  Quản lý Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
