
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Dumbbell, Users, Coffee, Leaf } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Salud Mental",
      description: "Soluciones enfocadas en el bienestar mental y emocional.",
      icon: Brain,
      color: "text-guay-purple",
      bgColor: "bg-guay-purple/10",
      borderColor: "border-guay-purple/20",
      link: "/dimension/mental-health"
    },
    {
      id: 2,
      name: "Bienestar Físico",
      description: "Programas para mejorar tu condición física y energía.",
      icon: Dumbbell,
      color: "text-guay-green",
      bgColor: "bg-guay-green/10",
      borderColor: "border-guay-green/20",
      link: "/dimension/physical"
    },
    {
      id: 3,
      name: "Nutrición",
      description: "Planes alimenticios para optimizar tu salud y rendimiento.",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      link: "/dimension/nutrition"
    },
    {
      id: 4,
      name: "Descanso",
      description: "Estrategias para mejorar la calidad de tu sueño y recuperación.",
      icon: Coffee,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      link: "/dimension/rest"
    },
    {
      id: 5,
      name: "Relaciones",
      description: "Herramientas para fortalecer tus conexiones personales y profesionales.",
      icon: Users,
      color: "text-guay-orange",
      bgColor: "bg-guay-orange/10",
      borderColor: "border-guay-orange/20",
      link: "/dimension/relationships"
    },
    {
      id: 6,
      name: "Bienestar Integral",
      description: "Programas holísticos que abarcan todas las dimensiones del bienestar.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      link: "/dimension/integral"
    },
  ];

  return (
    <div className="py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-guay-dark-blue mb-4">Categorías de Bienestar</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora nuestras diversas categorías de bienestar para encontrar
          soluciones adaptadas a tus necesidades específicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
          Podemos ayudarte a identificar qué categoría de bienestar necesita más atención en este momento.
        </p>
        <div className="flex justify-center">
          <Button asChild className="bg-guay-purple hover:bg-guay-purple/90">
            <Link to="/resultados">Realizar evaluación de bienestar</Link>
          </Button>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-guay-dark-blue mb-4">Soluciones personalizadas</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          ¿No encuentras lo que buscas? Podemos crear un programa a medida para tus necesidades específicas.
        </p>
        <Button asChild>
          <Link to="/request-solution">Solicitar solución personalizada</Link>
        </Button>
      </div>
    </div>
  );
};

export default Categories;
