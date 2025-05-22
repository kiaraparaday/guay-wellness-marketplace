
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Users, Heart, Calendar, Coffee, Sparkles } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-guay-dark-blue mb-4">Sobre Guay</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Somos un equipo dedicado a mejorar el bienestar integral 
          de personas y organizaciones a través de soluciones innovadoras.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-guay-purple mb-4 flex items-center gap-2">
            <Users className="h-6 w-6" /> Nuestro Equipo
          </h2>
          <p className="text-gray-700 mb-4">
            Contamos con profesionales especializados en diferentes áreas del bienestar:
            psicólogos, nutricionistas, entrenadores y especialistas en desarrollo 
            organizacional.
          </p>
          <p className="text-gray-700">
            Cada integrante aporta su experiencia única para crear un enfoque
            multidisciplinario que aborda todas las dimensiones del bienestar.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-guay-green mb-4 flex items-center gap-2">
            <Heart className="h-6 w-6" /> Nuestra Misión
          </h2>
          <p className="text-gray-700 mb-4">
            Transformar la forma en que personas y organizaciones entienden y 
            practican el bienestar, ofreciendo herramientas accesibles y 
            personalizadas.
          </p>
          <p className="text-gray-700">
            Buscamos crear un impacto positivo y duradero en la calidad de vida
            de nuestros clientes a través de soluciones holísticas.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md mb-16">
        <h2 className="text-2xl font-bold text-guay-orange mb-4 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-guay-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-guay-orange" />
            </div>
            <h3 className="font-bold mb-2">Innovación</h3>
            <p className="text-gray-600 text-sm">Buscamos constantemente nuevas formas de mejorar nuestros servicios y soluciones.</p>
          </div>
          <div className="text-center">
            <div className="bg-guay-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-guay-green" />
            </div>
            <h3 className="font-bold mb-2">Personalización</h3>
            <p className="text-gray-600 text-sm">Cada persona y organización es única, y nuestras soluciones reflejan esa individualidad.</p>
          </div>
          <div className="text-center">
            <div className="bg-guay-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="h-8 w-8 text-guay-purple" />
            </div>
            <h3 className="font-bold mb-2">Comunidad</h3>
            <p className="text-gray-600 text-sm">Creemos en el poder de las conexiones humanas para fomentar el bienestar.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-guay-dark-blue mb-6">¿Quieres conocer más sobre nosotros?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-guay-green hover:bg-guay-green/90">
            <Link to="/appointment">Agenda una consulta</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/solutions">Explora nuestras soluciones</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
