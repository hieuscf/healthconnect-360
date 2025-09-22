import React from "react";
import MainPatientLayout from "../../layout/MainPatientLayout";
import Home from "../../../pages/patient/Home";
import Profile from "../../../pages/patient/Profile";
import { Route } from "react-router-dom";

export const patientRoutes = [
  <Route
    key="/"
    path="/"
    element={
      <MainPatientLayout>
        <Home />
      </MainPatientLayout>
    }
  />,
  <Route
    key="/profile"
    path="/profile"
    element={
      <MainPatientLayout>
        <Profile />
      </MainPatientLayout>
    }
  />,
];
