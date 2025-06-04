
import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section className="pt-8 pb-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-2 text-sm font-medium text-blue-600">
              Marketplace de Bienestar Organizacional
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight">
              Soluciones de{" "}
              <span className="text-black">bienestar organizacional</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 max-w-2xl">
              Selecciona una dimensión del bienestar según las necesidades de tu organización o explora el catálogo completo de soluciones.
            </p>
          </div>
          
          {/* Dimensions Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-12 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Dimensiones del bienestar organizacional
              </h2>
              <p className="text-gray-600 text-sm">
                Descubre nuestras soluciones agrupadas por dimensión clave del bienestar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white border">
                <div className="relative h-48">
                  <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Factores Psicosociales
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Mejora el bienestar mental y emocional de tu equipo.
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white border">
                <div className="relative h-48">
                  <div className="w-full h-full bg-gradient-to-b from-orange-400 to-orange-600"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Clima Laboral
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Transforma el ambiente de trabajo para potenciar la productividad.
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white border">
                <div className="relative h-48">
                  <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-600"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Cultura Organizacional
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Fortalece valores compartidos y desarrolla capacidades de equipo.
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white border">
                <div className="relative h-48">
                  <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Diversidad, Equidad e Inclusión
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Crea espacios donde cada persona pueda brillar siendo auténtica.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-semibold mb-4">
                    ¿No encuentras lo que estás buscando?
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Nuestro equipo de expertos puede ayudarte a diseñar una solución personalizada según tus necesidades organizacionales.
                  </p>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contáctanos
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Index;
