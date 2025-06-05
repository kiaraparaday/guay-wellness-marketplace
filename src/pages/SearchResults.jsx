
import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Resultados de búsqueda para: "{query}"
        </h1>
        <p className="text-gray-600">
          Funcionalidad de búsqueda en desarrollo...
        </p>
      </div>
    </div>
  );
};

export default SearchResults;
