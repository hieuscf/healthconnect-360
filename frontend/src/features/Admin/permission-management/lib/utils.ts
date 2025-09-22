import type { Role, User, Permission } from "../model/types";

export const getRole = (roles: Role[], roleId: number) =>
  roles.find((r) => r.id === roleId);

export const getRoleName = (roles: Role[], roleId: number) =>
  getRole(roles, roleId)?.name ?? "Unknown";

export const getRoleColor = (roles: Role[], roleId: number) =>
  getRole(roles, roleId)?.color ?? "bg-gray-100 text-gray-800";

export const getPermissionName = (permissions: Permission[], permissionId: number) =>
  permissions.find((p) => p.id === permissionId)?.description ?? "Unknown";

export const getUserPermissions = (roles: Role[], user: User): number[] => {
  const all = new Set<number>();
  user.roleIds.forEach((roleId) => {
    const role = getRole(roles, roleId);
    if (role) role.permissions.forEach((p) => all.add(p));
  });
  return [...all];
};

export const getUserCountByRole = (users: User[], roleId: number) =>
  users.filter((u) => u.roleIds.includes(roleId)).length;