
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft, Calendar, Clock, Users, Download, Globe, FileText, Tag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { solutionsArray } from "../data/solutions";

// Mapping solution types to Spanish with colors
const solutionTypes: Record<string, {label: string, color: string}> = {
  workshop: { label: "Taller", color: "bg-blue-100 text-blue-800" },
  course: { label: "Curso", color: "bg-purple-100 text-purple-800" },
  webinar: { label: "Webinar", color: "bg-green-100 text-green-800" },
  coaching: { label: "Coaching", color: "bg-yellow-100 text-yellow-800" },
  assessment: { label: "Evaluación", color: "bg-orange-100 text-orange-800" },
};

// Mapping modalities to Spanish
const modalities: Record<string, string> = {
  "virtual": "Virtual",
  "presencial": "Presencial",
  "híbrida": "Híbrido",
};

const SolutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = id ? solutionsArray.find(s => s.id === id) : null;
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Solución no encontrada</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate or fetch a PDF
    toast.success("La información ha sido descargada en formato PDF");
  };

  const handleRequestAppointment = () => {
    // Navigate to appointment page
    window.location.href = "/appointment";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      
      {/* Image Gallery */}
      <section className="relative h-96 overflow-hidden bg-gray-100">
        <img 
          src={solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover"
        />
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Solution Details */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Volver al catálogo
                </Link>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={cn("px-2.5 py-1 rounded-md text-sm font-medium", solutionTypes[solution.type]?.color || "bg-gray-100 text-gray-800")}>
                    {solutionTypes[solution.type]?.label || solution.type}
                  </span>
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                    {modalities[solution.modality] || solution.modality}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
                  {solution.title}
                </h1>
                
                {/* Categories */}
                {solution.categories && solution.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="flex items-center text-gray-600 mr-2">
                      <Tag className="w-4 h-4 mr-1" />
                      <span className="text-sm">Categorías:</span>
                    </div>
                    {solution.categories.map((category, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{solution.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{modalities[solution.modality] || solution.modality}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{solution.audience}</span>
                  </div>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <h2 className="text-2xl font-medium mb-4">Descripción</h2>
                  <p className="text-gray-600 mb-4">
                    {solution.description}
                  </p>
                </div>
                
                {/* Related Competencies */}
                <div>
                  <h2 className="text-2xl font-medium mb-4">Competencias relacionadas</h2>
                  <div className="flex flex-wrap gap-2">
                    {solution.competencies.map(compId => (
                      <span 
                        key={compId}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg"
                      >
                        {compId}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - CTA and Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                <h2 className="text-xl font-medium mb-6">¿Interesado en esta solución?</h2>
                
                <button
                  onClick={handleRequestAppointment}
                  className="block w-full py-3 mb-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar una cita
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar información
                </button>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Agenda una llamada con nuestro equipo para discutir cómo esta solución puede adaptarse a las necesidades específicas de tu organización.
                  </p>
                  
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-xs">
                        ✓
                      </span>
                      Sin compromiso
                    </p>
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-xs">
                        ✓
                      </span>
                      Personalización a medida
                    </p>
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-xs">
                        ✓
                      </span>
                      Soporte post-implementación
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionPage;
