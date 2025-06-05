
import React from "react";

const QuienesSomos = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Quiénes Somos</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            GUAY es una empresa especializada en soluciones de bienestar organizacional, 
            comprometida con transformar los entornos laborales para crear espacios más 
            saludables, productivos y humanos.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-600 mb-6">
            Promover el bienestar integral en las organizaciones a través de soluciones 
            innovadoras y personalizadas que fortalezcan la cultura organizacional y 
            potencien el desarrollo humano.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
          <p className="text-gray-600 mb-6">
            Ser la empresa líder en Latinoamérica en soluciones de bienestar organizacional, 
            reconocida por nuestra excelencia y compromiso con la transformación positiva 
            de los entornos laborales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
