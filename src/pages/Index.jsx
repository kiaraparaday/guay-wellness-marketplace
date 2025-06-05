
import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Soluciones de Bienestar Organizacional
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Selecciona una dimensión del bienestar según las necesidades de tu organización o explora el catálogo completo de soluciones.
          </p>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Dimensiones del Bienestar Organizacional
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Factores Psicosociales */}
            <Link 
              to="/dimension/psychosocial"
              className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl p-6 text-white hover:from-blue-500 hover:to-blue-700 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-3">Factores Psicosociales</h3>
              <p className="text-blue-100">Mejora el bienestar mental y emocional de tu equipo.</p>
            </Link>
            
            {/* Clima Laboral */}
            <Link 
              to="/dimension/climate"
              className="bg-gradient-to-b from-orange-400 to-orange-600 rounded-xl p-6 text-white hover:from-orange-500 hover:to-orange-700 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-3">Clima Laboral</h3>
              <p className="text-orange-100">Transforma el ambiente de trabajo para potenciar la productividad.</p>
            </Link>
            
            {/* Cultura Organizacional */}
            <Link 
              to="/dimension/culture"
              className="bg-gradient-to-b from-green-400 to-green-600 rounded-xl p-6 text-white hover:from-green-500 hover:to-green-700 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-3">Cultura Organizacional</h3>
              <p className="text-green-100">Fortalece valores compartidos y desarrolla capacidades de equipo.</p>
            </Link>
            
            {/* Diversidad, Equidad e Inclusión */}
            <Link 
              to="/dimension/dei"
              className="bg-gradient-to-b from-purple-400 to-purple-600 rounded-xl p-6 text-white hover:from-purple-500 hover:to-purple-700 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-3">Diversidad, Equidad e Inclusión</h3>
              <p className="text-purple-100">Crea espacios donde cada persona pueda brillar siendo auténtica.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            ¿No encuentras lo que estás buscando?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nuestro equipo de expertos puede ayudarte a diseñar una solución personalizada según tus necesidades organizacionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/solutions"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todas las soluciones
            </Link>
            <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
