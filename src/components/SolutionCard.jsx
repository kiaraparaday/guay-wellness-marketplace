
import React from "react";
import { Link } from "react-router-dom";

const SolutionCard = ({ solution, index }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <img 
          src={solution.image} 
          alt={solution.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-guay-dark-blue text-white text-xs rounded">
            {solution.type}
          </span>
          <span className="px-2 py-1 bg-guay-dark-blue text-white text-xs rounded">
            {solution.modality}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-guay-dark-blue">
          {solution.title}
        </h3>
        
        <p className="text-guay-gray mb-4 line-clamp-3">
          {solution.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {solution.tags && solution.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-guay-purple/10 text-guay-purple text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-guay-slate mb-4">
          <span className="flex items-center">
            <span className="mr-1">⏱</span> {solution.duration}
          </span>
          <span className="flex items-center">
            <span className="mr-1">👥</span> {solution.audience}
          </span>
        </div>
        
        <Link 
          to={`/solution/${solution.id}`}
          className="inline-block w-full text-center bg-guay-blue text-white px-4 py-2 rounded-lg hover:bg-guay-blue/90 transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;
