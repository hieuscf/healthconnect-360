import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "./shared/lib/Notifications/Notification";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import MainAdminLayout from "./app/layout/MainAdminLayout";
import MainPatientLayout from "./app/layout/MainPatientLayout";
import Dashboard from "./pages/admin/DashBoard/DashBoard"; // import trang Dashboard
import Home from "./pages/patient/Home";

const App = () => {
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
        
        {/* Admin layout + Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <MainAdminLayout>
              <Dashboard />
            </MainAdminLayout>
          }
        />
      </Routes>
    </NotificationsProvider>
  );
};

export default App;
