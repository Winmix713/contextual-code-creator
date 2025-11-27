import HeroSection from "@/components/HeroSection";
import WhatIsMCP from "@/components/WhatIsMCP";
import Benefits from "@/components/Benefits";
import BuiltInServers from "@/components/BuiltInServers";
import SetupGuide from "@/components/SetupGuide";
import PracticalExamples from "@/components/PracticalExamples";
import CustomServers from "@/components/CustomServers";
import Security from "@/components/Security";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <WhatIsMCP />
      <Benefits />
      <BuiltInServers />
      <SetupGuide />
      <PracticalExamples />
      <CustomServers />
      <Security />
      <Footer />
    </div>
  );
};

export default Index;
