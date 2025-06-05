
import React, { useState, useEffect } from "react";
import { solutionsArray } from "../data/solutions";
import SolutionCard from "../components/SolutionCard";

const Solutions = () => {
  const [solutions] = useState(solutionsArray);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Catálogo de Soluciones
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explora nuestra amplia gama de servicios de bienestar organizacional
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900">
            Todas nuestras soluciones ({solutions.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
