
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { solutionsArray } from "../data/solutions";

const Competency = () => {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find solutions related to this competency
  const competencySolutions = solutionsArray.filter(solution => 
    solution.competencies.includes(id)
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">Competencia: {id}</h1>
          <p className="text-xl">
            Soluciones específicas para desarrollar esta competencia en tu organización
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900">
            Soluciones relacionadas ({competencySolutions.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competencySolutions.map((solution) => (
              <div key={solution.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={solution.image} 
                  alt={solution.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {solution.type}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {solution.modality}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {solution.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>⏱ {solution.duration}</span>
                    <span>👥 {solution.audience}</span>
                  </div>
                  
                  <Link 
                    to={`/solution/${solution.id}`}
                    className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Competency;
