import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import InfoRequestForm from "@/components/InfoRequestForm";
import { ArrowLeft, Clock, Users, Download, Globe, FileText, Tag, Mail } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { solutionsData } from "@/data/solutions";

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
  "in-person": "Presencial",
  "hybrid": "Híbrido",
};

const SolutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = id ? solutionsData[id] : null;
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showInfoRequestModal, setShowInfoRequestModal] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Solución no encontrada</h2>
          <Link to="/" className="text-primary hover:underline">
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

  const handleRequestInfo = () => {
    setShowInfoRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-poppins">
      <Header />
      
      {/* Image Gallery */}
      <section className="relative h-96 overflow-hidden bg-gray-100">
        <img 
          src={solution.images?.[activeImageIndex] || solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover animate-scale-in"
        />
        
        {solution.images && solution.images.length > 1 && (
          <div className="absolute left-0 right-0 bottom-6 flex justify-center gap-2">
            {solution.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === activeImageIndex 
                    ? "bg-white scale-125" 
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Solution Details */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                {solution.competencies.map(comp => (
                  <Link 
                    key={comp}
                    to={`/competency/${comp}`} 
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver a la competencia
                  </Link>
                ))}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={cn("px-2.5 py-1 rounded-md text-sm font-medium", solutionTypes[solution.type].color)}>
                    {solutionTypes[solution.type].label}
                  </span>
                  <span className="px-2.5 py-1 bg-black/80 text-white rounded-md text-sm font-medium">
                    {modalities[solution.modality]}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6 animate-fade-in">
                  {solution.title}
                </h1>
                
                {/* Categories */}
                {solution.categories && solution.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="flex items-center text-muted-foreground mr-2">
                      <Tag className="w-4 h-4 mr-1" />
                      <span className="text-sm">Categorías:</span>
                    </div>
                    {solution.categories.map((category, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-sm bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-muted-foreground mr-2" />
                    <span>{solution.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-muted-foreground mr-2" />
                    <span>{modalities[solution.modality]}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-muted-foreground mr-2" />
                    <span>{solution.audience}</span>
                  </div>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <h2 className="text-2xl font-medium mb-4">Descripción</h2>
                  <p className="text-muted-foreground mb-4">
                    {solution.description}
                  </p>
                  {solution.detailedDescription && (
                    <div dangerouslySetInnerHTML={{ __html: solution.detailedDescription }} />
                  )}
                </div>
                
                {solution.benefits && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-medium mb-4">Beneficios</h2>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                            ✓
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {solution.includes && (
                  <div>
                    <h2 className="text-2xl font-medium mb-4">Incluye</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {solution.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FileText className="w-4 h-4 text-primary mr-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Facilitator */}
              {solution.facilitator && (
                <div className="bg-white p-6 rounded-xl border border-border shadow-subtle mb-8">
                  <h2 className="text-xl font-medium mb-4">Facilitador(a)</h2>
                  <div className="flex items-center">
                    <img 
                      src={solution.facilitator.image} 
                      alt={solution.facilitator.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{solution.facilitator.name}</h3>
                      <p className="text-sm text-muted-foreground">{solution.facilitator.position}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Related Competencies */}
              <div>
                <h2 className="text-2xl font-medium mb-4">Competencias relacionadas</h2>
                <div className="flex flex-wrap gap-2">
                  {solution.competencies.map(compId => (
                    <Link 
                      key={compId}
                      to={`/competency/${compId}`}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all-200"
                    >
                      {compId}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - CTA and Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-border shadow-subtle sticky top-24">
                <h2 className="text-xl font-medium mb-6">¿Interesado en esta solución?</h2>
                
                <Link
                  to={`/request-info/${id}`}
                  className="block w-full py-3 mb-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all-200 flex items-center justify-center text-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Solicitar información
                </Link>
                
                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-3 bg-white text-foreground rounded-lg font-medium border border-border hover:border-primary/20 transition-all-200 flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar información
                </button>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Solicita información específica sobre esta solución y nuestro equipo se pondrá en contacto contigo para discutir cómo puede adaptarse a las necesidades de tu organización.
                  </p>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-2">
                        ✓
                      </span>
                      Sin compromiso
                    </p>
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-2">
                        ✓
                      </span>
                      Personalización a medida
                    </p>
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-2">
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
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guay-600 to-guay-400">
              GUAY
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              Wellness Marketplace
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Guay. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Info Request Modal */}
      <InfoRequestForm
        isOpen={showInfoRequestModal}
        onClose={() => setShowInfoRequestModal(false)}
        solutionTitle={solution.title}
      />
    </div>
  );
};

export default SolutionPage;
