import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./features/auth/model/authStore";
import { NotificationsProvider } from "./shared/lib/Notifications/Notification";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import MainAdminLayout from "./app/layout/MainAdminLayout";
import MainPatientLayout from "./app/layout/MainPatientLayout";
import Dashboard from "./pages/admin/DashBoard/DashBoard"; // import trang Dashboard
import Home from "./pages/patient/Home";
import Scheduler from "./pages/doctor/Scheduler/Scheduler";
import User from "./pages/admin/User/User";
import Profile from "./pages/patient/Profile";
//import DoctorManagement from "./pages/test";
import ManagerDoctor from "./pages/admin/ManagerDoctor/ManagerDoctorPage";
import Permission from "./pages/admin/Permission/Permission";

const App = () => {
  const { isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    initialize(); // Load lại token nếu có
  }, []);
  return (
    <NotificationsProvider>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Patient layout + Dashboard */}
        <Route
          path="/"
          element={
            <MainPatientLayout>
              <Home />
            </MainPatientLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainPatientLayout>
              <Profile />
            </MainPatientLayout>
          }
        />

        {/* <Route
          path="/test"
          element={
            <MainPatientLayout>
              <DoctorManagement />
            </MainPatientLayout>
          }
        /> */}

        {/* Admin layout + Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <MainAdminLayout>
              <Dashboard />
            </MainAdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <MainAdminLayout>
              <User />
            </MainAdminLayout>
          }
        />
        <Route
          path="/admin/doctor"
          element={
            <MainAdminLayout>
              <ManagerDoctor />
            </MainAdminLayout>
          }
        />
        <Route
          path="/admin/scheduler"
          element={
            <MainAdminLayout>
              <Scheduler />
            </MainAdminLayout>
          }
        />
        <Route
          path="/admin/permission"
          element={
            <MainAdminLayout>
              <Permission />
            </MainAdminLayout>
          }
        />
      </Routes>
    </NotificationsProvider>
  );
};

export default App;
