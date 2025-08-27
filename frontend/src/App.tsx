import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotificationsProvider } from "./shared/lib/Notifications/Notification";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";

const App = () => {
  return (
    <NotificationsProvider>
      <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </NotificationsProvider>
  );
};

export default App;
