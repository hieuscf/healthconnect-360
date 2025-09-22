// src/features/permission-management/index.tsx
import React, { useState } from "react";
import { Plus, Shield, Users } from "lucide-react";
import { usePermissionStore } from "../model/store";
import { RoleCard } from "../components/RoleCard";
import { UserTable } from "../components/RoleTable";
import { getUserCountByRole } from "../lib/utils";

export const PermissionManagement: React.FC = () => {
  const { permissions, roles, setRoles, users, setUsers } =
    usePermissionStore();
  const [activeTab, setActiveTab] = useState<"roles" | "users">("roles");

  const handleDeleteRole = (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa role này?")) return;
    setRoles(roles.filter((r) => r.id !== id));
    setUsers(
      users.map((u) => ({
        ...u,
        roleIds: u.roleIds.filter((rid) => rid !== id),
      }))
    );
  };

  return (
    <div className="max-w mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Quản lý Phân quyền</h1>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("roles")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "roles"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            <Shield className="w-5 h-5 inline mr-2" /> Quản lý Role
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" /> Người dùng
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "roles" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Danh sách Role</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tạo Role mới
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                permissions={permissions}
                userCount={getUserCountByRole(users, role.id)}
                onEdit={(r) => console.log("Edit role", r)}
                onDelete={handleDeleteRole}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <UserTable
          users={users}
          roles={roles}
          permissions={permissions}
          onManageRole={(u) => console.log("Quản lý role user", u)}
        />
      )}
    </div>
  );
};
