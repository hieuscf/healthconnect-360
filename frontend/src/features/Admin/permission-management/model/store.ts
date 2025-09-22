// src/features/permission-management/model/store.ts
import { useState } from "react";
import type { Permission, Role, User } from "./types";

export const usePermissionStore = () => {
  // Permissions (cứng)
  const [permissions] = useState<Permission[]>([
    { id: 1, name: "user_create", description: "Tạo người dùng mới" },
    { id: 2, name: "user_read", description: "Xem thông tin người dùng" },
    { id: 3, name: "user_update", description: "Cập nhật thông tin người dùng" },
    { id: 4, name: "user_delete", description: "Xóa người dùng" },
    { id: 5, name: "role_create", description: "Tạo role mới" },
    { id: 6, name: "role_read", description: "Xem thông tin role" },
    { id: 7, name: "role_update", description: "Cập nhật role" },
    { id: 8, name: "role_delete", description: "Xóa role" },
    { id: 9, name: "system_admin", description: "Quản trị hệ thống" },
    { id: 10, name: "report_view", description: "Xem báo cáo" },
  ]);

  // Roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Admin",
      description: "Quản trị viên hệ thống",
      permissions: [1,2,3,4,5,6,7,8,9,10],
      color: "bg-red-100 text-red-800",
    },
    {
      id: 2,
      name: "Manager",
      description: "Quản lý",
      permissions: [2,3,6,10],
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      name: "User",
      description: "Người dùng thường",
      permissions: [2],
      color: "bg-green-100 text-green-800",
    },
  ]);

  // Users
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Nguyễn Văn A", email: "nva@example.com", roleIds: [1], status: "active" },
    { id: 2, name: "Trần Thị B", email: "ttb@example.com", roleIds: [2], status: "active" },
    { id: 3, name: "Lê Văn C", email: "lvc@example.com", roleIds: [3], status: "inactive" },
  ]);

  return { permissions, roles, setRoles, users, setUsers };
};
