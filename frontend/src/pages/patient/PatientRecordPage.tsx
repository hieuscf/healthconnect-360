import React from "react";
import ProfileHeader from "../../features/Patient/profile/ui/ProfileHeader";
import AnthropometricMeasurement from "../../features/Patient/PatientRecord/ui/AnthropometricMeasurement";
import ClinicalParameters from "../../features/Patient/PatientRecord/ui/ClinicalParameters";

const PatientRecordPage = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
      <ProfileHeader />
      <AnthropometricMeasurement />
      <ClinicalParameters />
    </div>
  );
};

export default PatientRecordPage;
