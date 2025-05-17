
import React from "react";
import Header from "@/components/Header";
import SimpleFooter from "@/components/SimpleFooter";
import FormControls from "@/components/FormControls";
import CallToActionSection from "@/components/CallToActionSection";

const ControlDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      <FormControls />
      <CallToActionSection competencyTitle="UI Controls" showControls={true} />
      <SimpleFooter />
    </div>
  );
};

export default ControlDemo;
