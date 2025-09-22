import React from "react";
import { Route } from "react-router-dom";
import MainAdminLayout from "../../../app/layout/MainAdminLayout";
import Dashboard from "../../../pages/admin/DashBoard/DashBoard";
import User from "../../../pages/admin/User/User";
import ManagerDoctor from "../../../pages/admin/ManagerDoctor/ManagerDoctorPage";
import Permission from "../../../pages/admin/Permission/Permission";

// Mảng route admin
export const adminRoutes = [
  <Route
    key="/admin/dashboard"
    path="/admin/dashboard"
    element={
      <MainAdminLayout>
        <Dashboard />
      </MainAdminLayout>
    }
  />,
  <Route
    key="/admin/users"
    path="/admin/users"
    element={
      <MainAdminLayout>
        <User />
      </MainAdminLayout>
    }
  />,
  <Route
    key="/admin/doctor"
    path="/admin/doctor"
    element={
      <MainAdminLayout>
        <ManagerDoctor />
      </MainAdminLayout>
    }
  />,
  <Route
    key="/admin/permission"
    path="/admin/permission"
    element={
      <MainAdminLayout>
        <Permission />
      </MainAdminLayout>
    }
  />,
];
