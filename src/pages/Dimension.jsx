
import React from "react";
import { useParams, Link } from "react-router-dom";
import { dimensionsData } from "../data/dimensionsData";

const Dimension = () => {
  const { id } = useParams();
  const dimension = dimensionsData[id];

  if (!dimension) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Dimensión no encontrada</h2>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{dimension.title}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{dimension.description}</p>
        </div>
      </section>

      {/* Competencies Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Competencias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimension.competencies.map((competency) => (
              <div key={competency.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {competency.title}
                </h3>
                <p className="text-gray-600 mb-4">{competency.description}</p>
                <Link 
                  to={`/competency/${competency.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver soluciones →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dimension;
