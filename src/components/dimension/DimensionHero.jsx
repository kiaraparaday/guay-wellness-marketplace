
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DimensionHero = ({ dimension }) => {
  return (
    <section className="pt-12 pb-3 px-6 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3">
          <Button asChild variant="ghost" className="pl-0">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          <div className="lg:col-span-2">
            <h1 className="text-xl sm:text-2xl font-semibold mb-2 animate-fade-in">
              {dimension.title}
            </h1>
            <p className="text-muted-foreground mb-0 animate-fade-in text-sm" style={{ animationDelay: "100ms" }}>
              {dimension.description}
            </p>
          </div>
          
          {dimension.image && (
            <div className="flex justify-center lg:justify-end">
              <img 
                src={dimension.image} 
                alt={dimension.title}
                className="w-full max-w-xs h-24 sm:h-28 object-cover rounded-lg shadow-subtle animate-fade-in"
                style={{ animationDelay: "200ms" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DimensionHero;
