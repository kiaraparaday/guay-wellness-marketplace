import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowLeft, Calendar, Clock, Users, Download, Globe, FileText, Tag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Sample solutions data
const solutionsData = {
  "solution-1": {
    id: "solution-1",
    title: "Taller de Gestión del Estrés y Carga Mental",
    type: "workshop",
    modality: "in-person",
    duration: "4 horas",
    audience: "Todos los colaboradores",
    description: "Este taller práctico proporciona herramientas y técnicas concretas para identificar y manejar el estrés laboral y distribuir mejor las cargas cognitivas en el entorno de trabajo. A través de ejercicios prácticos y casos de estudio, los participantes aprenderán a reconocer los signos de sobrecarga mental, implementar estrategias de gestión del estrés y crear planes personalizados para mantener un equilibrio saludable.",
    detailedDescription: `
      <p>El estrés y la sobrecarga mental son factores que afectan significativamente la productividad, satisfacción y bienestar de los colaboradores. Este taller intensivo está diseñado para dotar a los participantes con herramientas prácticas para:</p>
      
      <ul>
        <li>Identificar los signos tempranos de estrés laboral y sobrecarga mental</li>
        <li>Comprender cómo el cerebro procesa la información y las limitaciones cognitivas</li>
        <li>Aprender técnicas de priorización y gestión del tiempo</li>
        <li>Desarrollar estrategias de desconexión y recuperación</li>
        <li>Practicar técnicas de atención plena (mindfulness) aplicadas al entorno laboral</li>
        <li>Crear un plan personalizado de gestión de la carga mental</li>
      </ul>
      
      <p>La metodología del taller es eminentemente práctica, combinando exposiciones teóricas con ejercicios individuales y grupales, análisis de casos reales y sesiones de reflexión. Los participantes saldrán con un toolkit de recursos que podrán implementar inmediatamente en su día a día laboral.</p>
    `,
    benefits: [
      "Reducción de los niveles de estrés entre los colaboradores",
      "Mejora de la concentración y productividad",
      "Disminución del absentismo relacionado con la fatiga mental",
      "Mejora del clima laboral y las relaciones interpersonales",
      "Aumento de la satisfacción y compromiso de los colaboradores",
    ],
    includes: [
      "Material didáctico digital",
      "Evaluación previa y posterior al taller",
      "Sesión de seguimiento a las 4 semanas",
      "Certificado de participación",
    ],
    facilitator: {
      name: "Dra. María Rodríguez",
      position: "Psicóloga Organizacional especializada en estrés laboral",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    ],
    competencies: [
      { id: "mental-workload", name: "Gestión de Cargas Mentales", dimensionId: "psychosocial", dimensionName: "Factores Psicosociales" },
    ],
    categories: ["Carga Mental", "Bienestar", "Estrés"]
  },
  
  "solution-2": {
    id: "solution-2",
    title: "Curso Online de Comunicación Efectiva",
    type: "course",
    modality: "virtual",
    duration: "6 semanas",
    audience: "Líderes",
    description: "Desarrolla habilidades para transmitir mensajes claros, escuchar activamente y gestionar conversaciones difíciles en entornos laborales. Este curso completamente online te permite aprender a tu propio ritmo con contenido de alta calidad y ejercicios prácticos para aplicar en situaciones reales.",
    detailedDescription: `
      <p>La comunicación efectiva es una de las habilidades más valoradas en el entorno laboral moderno. Este curso completo aborda todos los aspectos necesarios para mejorar tus capacidades comunicativas como líder, incluyendo:</p>
      
      <ul>
        <li>Fundamentos de la comunicación interpersonal</li>
        <li>Técnicas avanzadas de escucha activa</li>
        <li>Comunicación asertiva y feedback constructivo</li>
        <li>Gestión de conversaciones difíciles</li>
        <li>Comunicación intercultural y en equipos diversos</li>
        <li>Presentaciones impactantes y storytelling</li>
      </ul>
      
      <p>El curso está estructurado en módulos semanales que combinan teoría, ejemplos prácticos, ejercicios, simulaciones y tareas para aplicar en el entorno real de trabajo. La plataforma interactiva permite conectar con otros participantes y recibir retroalimentación personalizada de los facilitadores.</p>
    `,
    benefits: [
      "Mayor claridad y efectividad en la comunicación del equipo",
      "Reducción de conflictos y malentendidos",
      "Mejora en la capacidad para influir e inspirar",
      "Aumento de la confianza al abordar conversaciones difíciles",
      "Fortalecimiento de la cohesión y colaboración en el equipo",
    ],
    includes: [
      "6 módulos con más de 30 lecciones en video",
      "Material descargable y herramientas prácticas",
      "Foros de discusión con facilitadores expertos",
      "2 sesiones grupales de coaching en vivo",
      "Certificado digital al completar el curso",
    ],
    facilitator: {
      name: "Carlos Méndez",
      position: "Especialista en Comunicación Organizacional",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80",
    ],
    competencies: [
      { id: "communication", name: "Comunicación", dimensionId: "climate", dimensionName: "Clima Laboral" },
    ],
    categories: ["Comunicación", "Liderazgo", "Trabajo en Equipo"]
  },
};

type SolutionDataType = typeof solutionsData[keyof typeof solutionsData];

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
  const solution = id ? solutionsData[id as keyof typeof solutionsData] : null;
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const handleRequestAppointment = () => {
    setShowAppointmentForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Header />
      
      {/* Image Gallery */}
      <section className="relative h-96 overflow-hidden bg-gray-100">
        <img 
          src={solution.images[activeImageIndex]} 
          alt={solution.title} 
          className="w-full h-full object-cover animate-scale-in"
        />
        
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
                    key={comp.id}
                    to={`/competency/${comp.id}`} 
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver a {comp.name}
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
                  <div dangerouslySetInnerHTML={{ __html: solution.detailedDescription }} />
                </div>
                
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
              </div>
              
              {/* Facilitator */}
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
              
              {/* Related Competencies */}
              <div>
                <h2 className="text-2xl font-medium mb-4">Competencias relacionadas</h2>
                <div className="flex flex-wrap gap-2">
                  {solution.competencies.map(comp => (
                    <Link 
                      key={comp.id}
                      to={`/competency/${comp.id}`}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all-200"
                    >
                      {comp.name} ({comp.dimensionName})
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - CTA and Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-border shadow-subtle sticky top-24">
                <h2 className="text-xl font-medium mb-6">¿Interesado en esta solución?</h2>
                
                <button
                  onClick={handleRequestAppointment}
                  className="w-full py-3 mb-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all-200 flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar una cita
                </button>
                
                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-3 bg-white text-foreground rounded-lg font-medium border border-border hover:border-primary/20 transition-all-200 flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar información
                </button>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Agenda una llamada con nuestro equipo para discutir cómo esta solución puede adaptarse a las necesidades específicas de tu organización.
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
    </div>
  );
};

export default SolutionPage;
