
import React from "react";
import Header from "@/components/Header";
import SimpleFooter from "@/components/SimpleFooter";
import FormControls from "@/components/FormControls";
import CallToActionSection from "@/components/CallToActionSection";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ControlDemo: React.FC = () => {
  const handleDemoToast = () => {
    toast({
      title: "Control Demo",
      description: "This is a test toast notification",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">UI Controls Demo</h1>
        <Button 
          onClick={handleDemoToast}
          variant="guay-primary"
          size="mediano"
          className="mb-6"
        >
          Test Toast Notification
        </Button>
        <FormControls />
      </div>
      <CallToActionSection competencyTitle="UI Controls" showControls={true} />
      <SimpleFooter />
    </div>
  );
};

export default ControlDemo;
