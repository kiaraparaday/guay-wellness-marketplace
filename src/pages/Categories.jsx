
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Users, Building, HeartHandshake, LineChart, Coffee } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Factores Psicosociales",
      description: "Soluciones para identificar y gestionar los factores que afectan la salud mental en el entorno laboral.",
      icon: Brain,
      color: "text-guay-purple",
      bgColor: "bg-guay-purple/10",
      borderColor: "border-guay-purple/20",
      link: "/dimension/psicosocial"
    },
    {
      id: 2,
      name: "Clima Laboral",
      description: "Estrategias para mejorar el ambiente de trabajo y fomentar un clima positivo y productivo.",
      icon: LineChart,
      color: "text-guay-green",
      bgColor: "bg-guay-green/10",
      borderColor: "border-guay-green/20",
      link: "/dimension/clima-laboral"
    },
    {
      id: 3,
      name: "Cultura Organizacional",
      description: "Programas para desarrollar y fortalecer los valores, creencias y comportamientos compartidos en la organización.",
      icon: Building,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      link: "/dimension/cultura"
    },
    {
      id: 4,
      name: "Diversidad, Equidad e Inclusión",
      description: "Soluciones para crear entornos laborales inclusivos donde todas las personas puedan prosperar.",
      icon: HeartHandshake,
      color: "text-guay-orange",
      bgColor: "bg-guay-orange/10",
      borderColor: "border-guay-orange/20",
      link: "/dimension/dei"
    },
  ];

  return (
    <div className="py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-guay-dark-blue mb-4">Categorías de Bienestar Organizacional</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora nuestras diversas categorías de bienestar organizacional para encontrar
          soluciones adaptadas a las necesidades específicas de tu empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {categories.map((category) => (
          <Link 
            to={category.link} 
            key={category.id} 
            className={`block border ${category.borderColor} rounded-xl p-6 hover:shadow-md transition-shadow ${category.bgColor}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${category.bgColor} ${category.color}`}>
                <category.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold mb-2 ${category.color}`}>{category.name}</h2>
                <p className="text-gray-700">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md mb-12">
        <h2 className="text-2xl font-bold text-guay-dark-blue mb-4 text-center">¿No sabes por dónde empezar?</h2>
        <p className="text-center text-gray-600 mb-6">
          Podemos ayudarte a identificar qué categoría necesita más atención en tu organización.
        </p>
        <div className="flex justify-center">
          <Button asChild variant="guay-primary" size="grande">
            <Link to="/resultados">Realizar diagnóstico organizacional</Link>
          </Button>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-guay-dark-blue mb-4">Soluciones personalizadas</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          ¿No encuentras lo que buscas? Podemos crear un programa a medida para las necesidades específicas de tu organización.
        </p>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Button asChild variant="guay-cta-secondary" size="grande">
            <Link to="/request-solution">Solicitar solución personalizada</Link>
          </Button>
          <Button asChild variant="guay-cta-primary" size="grande">
            <Link to="/appointment">Agendar una cita</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
