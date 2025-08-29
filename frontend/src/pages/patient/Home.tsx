import React from "react";
import HeaderBackground from "../../shared/ui/HeaderBackground.tsx/HeaderBackground";
import ServicesSection from "../../shared/ui/ServicesSection/ServicesSection";
import HealthcareLanding from "../../shared/ui/HealthcareLanding.tsx/HealthcareLanding";
import HealthcareNewsroom from "../../shared/ui/HealthcareNewroom/HealthcareNewroom";
import AsSeenOn from "../../shared/ui/DuplicatedLogos/AsSeenOn";
import AwardsSection from "../../shared/ui/AwardsSection.tsx/AwardsSection";

const Home = () => {
  return (
    <>
      <HeaderBackground />
      <ServicesSection/>
      <HealthcareLanding />
      <AsSeenOn/>
      <HealthcareNewsroom/>
      <AwardsSection/>
    </>
  );
};

export default Home;
