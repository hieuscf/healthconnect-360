// src/features/permission-management/model/types.ts
export interface Permission {
  id: number;
  name: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[];
  color: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roleIds: number[];
  status: "active" | "inactive";
}