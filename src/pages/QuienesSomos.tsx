
import { Users, Database, Laptop, BarChart3, HeadphonesIcon, ShoppingCart, Award, Shield, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const QuienesSomos = () => {
  const teamAreas = [
    { name: "Consultoría", icon: Users },
    { name: "Científico de datos", icon: Database },
    { name: "Tecnología", icon: Laptop },
    { name: "Analytics", icon: BarChart3 },
    { name: "Soporte", icon: HeadphonesIcon },
    { name: "Ventas", icon: ShoppingCart },
    { name: "Experiencia", icon: Award }
  ];

  const strategicObjectives = [
    {
      title: "Eliminar riesgos",
      points: ["Automatizando procesos", "Disminuyendo rotación"],
      icon: Shield,
      color: "guay-purple"
    },
    {
      title: "Reducir costos",
      points: ["Transformación digital", "Continuidad operativa", "Cumplimiento de normas"],
      icon: DollarSign,
      color: "guay-orange"
    },
    {
      title: "Generar eficiencia",
      points: ["KPIs clave", "Información accionable"],
      icon: TrendingUp,
      color: "guay-green"
    }
  ];

  return (
    <div className="py-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 bg-gradient-to-br from-guay-dark-blue/5 to-guay-purple/5 rounded-2xl p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-guay-dark-blue mb-6 font-quicksand">
          Transformamos el bienestar organizacional desde lo humano, los datos y la tecnología
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto font-quicksand">
          En Guay creemos que cada persona merece un entorno laboral digno, sostenible y centrado en su propósito humano. 
          Usamos datos, ciencia y tecnología para lograrlo.
        </p>
      </div>

      {/* Propósito y Misión */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-gradient-to-br from-guay-green/10 to-guay-green/5 border-guay-green/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-guay-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-guay-dark-blue mb-4 font-quicksand">Propósito</h2>
            <p className="text-gray-700 text-lg font-quicksand">
              Contribuir a que se cumpla el propósito humano a través del uso de la tecnología, las ciencias y los datos.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-guay-orange/10 to-guay-orange/5 border-guay-orange/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-guay-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-guay-dark-blue mb-4 font-quicksand">Misión</h2>
            <p className="text-gray-700 text-lg font-quicksand">
              Lograr que el propósito humano sea universal y sostenible.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Nuestro Equipo */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-guay-dark-blue text-center mb-8 font-quicksand">Nuestro Equipo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {teamAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-3 hover:shadow-xl transition-shadow">
                  <IconComponent className="w-8 h-8 text-guay-dark-blue" />
                </div>
                <p className="text-sm font-medium text-gray-700 font-quicksand">{area.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Objetivos Estratégicos */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-guay-dark-blue text-center mb-8 font-quicksand">
          Nuestros objetivos estratégicos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {strategicObjectives.map((objective, index) => {
            const IconComponent = objective.icon;
            return (
              <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${objective.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 text-${objective.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-guay-dark-blue mb-4 font-quicksand">
                    {objective.title}
                  </h3>
                  <ul className="space-y-2">
                    {objective.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="text-gray-600 font-quicksand">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quote Final */}
      <div className="text-center bg-gradient-to-r from-guay-dark-blue to-guay-purple p-12 rounded-2xl text-white">
        <blockquote className="text-2xl md:text-3xl font-medium mb-6 italic font-quicksand">
          "Trabajemos de la mano para mejorar organizaciones, que mejoren vidas, para mejorar el mundo."
        </blockquote>
        <cite className="text-lg font-semibold font-quicksand">
          — Carlos Parada, CEO & Founder
        </cite>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Button asChild className="bg-guay-green hover:bg-guay-green/90 text-white px-8 py-3 rounded-full text-lg font-quicksand">
          <Link to="/appointment">Conoce cómo podemos ayudarte</Link>
        </Button>
      </div>
    </div>
  );
};

export default QuienesSomos;
