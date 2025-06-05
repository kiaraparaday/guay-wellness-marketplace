
import React from "react";
import { Link } from "react-router-dom";

const SolutionCard = ({ solution, index }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
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
        
        <p className="text-gray-600 mb-4 line-clamp-3">
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
  );
};

export default SolutionCard;
