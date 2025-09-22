import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./features/auth/model/authStore";
import { NotificationsProvider } from "./shared/lib/Notifications/Notification";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import { patientRoutes } from "./app/routing/Patient/PatientRoutes";
import { adminRoutes } from "./app/routing/Admin/AdminRoutes";

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
        {patientRoutes}

        {/* Admin layout + Dashboard */}
        {adminRoutes}
      </Routes>
    </NotificationsProvider>
  );
};

export default App;
