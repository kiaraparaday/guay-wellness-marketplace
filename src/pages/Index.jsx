
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dimensions');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const testimonials = [
    {
      id: 1,
      quote: "Implementar el programa de mindfulness corporativo transformó la cultura de nuestro equipo. Notamos una mejora del 30% en productividad y satisfacción laboral.",
      author: "María Rodríguez",
      position: "Directora de Recursos Humanos",
      company: "TechSolutions S.A.",
      industry: "Tecnología",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      quote: "La formación en liderazgo consciente nos permitió desarrollar directivos más empáticos y efectivos. El resultado fue inmediato en la retención de talento.",
      author: "Carlos Mendoza",
      position: "CEO",
      company: "Innogreen",
      industry: "Energías Renovables",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      quote: "El taller de construcción de equipos diversos fue una inversión excelente. Logramos crear un ambiente donde todas las voces son escuchadas y valoradas.",
      author: "Ana Gómez",
      position: "Directora de Operaciones",
      company: "GlobalHealth",
      industry: "Salud",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    },
  ];

  const featuredSolutions = [
    {
      id: "taller-gestion-estres",
      title: "Taller de Gestión del Estrés y Carga Mental",
      type: "Taller",
      modality: "Presencial",
      duration: "4 horas",
      audience: "Todos los colaboradores",
      description: "Este taller práctico proporciona herramientas y técnicas concretas para identificar y manejar el estrés y la carga mental en el entorno laboral.",
      tags: ["Carga Mental", "Bienestar", "Estrés"],
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80"
    },
    {
      id: "curso-comunicacion-efectiva",
      title: "Curso Online de Comunicación Efectiva",
      type: "Curso",
      modality: "Virtual",
      duration: "6 semanas",
      audience: "Líderes",
      description: "Desarrolla habilidades para transmitir mensajes claros, escuchar activamente y gestionar conversaciones difíciles.",
      tags: ["Comunicación", "Liderazgo", "Trabajo en Equipo"],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
    },
    {
      id: "taller-comunicacion-asertiva",
      title: "Taller de Comunicación Asertiva",
      type: "Taller",
      modality: "Presencial",
      duration: "8 horas",
      audience: "Todos los niveles",
      description: "Aprende a comunicarte con claridad y respeto, defendiendo tus ideas mientras respetas las de los demás.",
      tags: ["Comunicación", "Asertividad", "Resolución de Conflictos"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    },
    {
      id: "herramientas-trabajo-colaborativo",
      title: "Herramientas para el Trabajo Colaborativo Eficiente",
      type: "Webinar",
      modality: "Virtual",
      duration: "2 horas",
      audience: "Equipos de trabajo",
      description: "Optimiza la colaboración y comunicación en equipo mediante metodologías y herramientas digitales avanzadas.",
      tags: ["Trabajo en Equipo", "Productividad", "Herramientas Digitales"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-2 text-sm font-medium text-gray-500">
            Marketplace de Bienestar Organizacional
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Soluciones de<br />
            bienestar organizacional
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Selecciona una dimensión del bienestar según las necesidades de tu organización o explora el catálogo completo de soluciones.
          </p>

          {/* Navigation Question */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-blue-500 text-2xl mr-2">🔍</span>
              <h2 className="text-xl font-semibold">¿Cómo deseas explorar las soluciones?</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Elige la forma que mejor se adapte a tus necesidades organizacionales
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleTabChange('dimensions')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'dimensions'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Explorar por dimensión
              </button>
              <button
                onClick={() => handleTabChange('catalog')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'catalog'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Ver catálogo completo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Section */}
      {activeTab === 'dimensions' && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                Dimensiones del bienestar organizacional
              </h2>
              <p className="text-gray-600 mb-8">
                Descubre nuestras soluciones agrupadas por dimensión clave del bienestar, para responder a las distintas necesidades de tu equipo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Factores Psicosociales */}
                <Link 
                  to="/dimension/psychosocial"
                  className="group block"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80"
                      alt="Factores Psicosociales"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Factores Psicosociales</h3>
                  <p className="text-gray-600 text-sm mb-3">Mejora el bienestar mental y emocional de tu equipo.</p>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800">
                    Explorar soluciones →
                  </div>
                </Link>
                
                {/* Clima Laboral */}
                <Link 
                  to="/dimension/climate"
                  className="group block"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
                      alt="Clima Laboral"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Clima Laboral</h3>
                  <p className="text-gray-600 text-sm mb-3">Transforma el ambiente de trabajo para potenciar la productividad.</p>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800">
                    Explorar soluciones →
                  </div>
                </Link>
                
                {/* Cultura Organizacional */}
                <Link 
                  to="/dimension/culture"
                  className="group block"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                      alt="Cultura Organizacional"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cultura Organizacional</h3>
                  <p className="text-gray-600 text-sm mb-3">Fortalece valores compartidos y desarrolla capacidades de equipo.</p>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800">
                    Explorar soluciones →
                  </div>
                </Link>
                
                {/* Diversidad, Equidad e Inclusión */}
                <Link 
                  to="/dimension/dei"
                  className="group block"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                      alt="Diversidad, Equidad e Inclusión"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Diversidad, Equidad e Inclusión</h3>
                  <p className="text-gray-600 text-sm mb-3">Crea espacios donde cada persona pueda brillar siendo auténtica.</p>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800">
                    Explorar soluciones →
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solutions Destacadas Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">SOLUCIONES DESTACADAS</h2>
              <p className="text-gray-600">
                Seleccionadas por su alto impacto, relevancia y resultados comprobados en bienestar organizacional.
              </p>
            </div>
            <Link 
              to="/solutions"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Ver el catálogo completo de soluciones →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredSolutions.map((solution) => (
              <div key={solution.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-black text-white text-xs rounded">
                      {solution.type}
                    </span>
                    <span className="px-2 py-1 bg-black text-white text-xs rounded">
                      {solution.modality}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{solution.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {solution.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <span className="mr-1">⏱</span> {solution.duration}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">👥</span> {solution.audience}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/solution/${solution.id}`}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Casos de Éxito</h2>
              <p className="text-gray-600">
                Experiencias reales de organizaciones que han transformado su bienestar
              </p>
            </div>
            <Link 
              to="/testimonials"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver más testimonios →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="mb-4 text-blue-500 text-4xl">"</div>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>🏢</span>
                      <span className="ml-1">{testimonial.company}</span>
                      <span className="mx-2">•</span>
                      <span>🏭</span>
                      <span className="ml-1">{testimonial.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mejorada con imagen */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold mb-4">
                  ¿No encuentras lo que estás buscando?
                </h2>
                <p className="text-gray-600 mb-6">
                  Nuestro equipo de expertos puede ayudarte a diseñar una solución personalizada según tus necesidades organizacionales.
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors w-fit">
                  Contáctanos
                </button>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                  alt="Equipo de trabajo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold">guay</span>
                <span className="ml-2 text-sm text-gray-400">Wellness Marketplace</span>
              </div>
              <p className="text-gray-400 text-sm">
                Soluciones de bienestar personalizadas para organizaciones que buscan potenciar el desarrollo humano.
              </p>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/solutions" className="hover:text-white transition-colors">Soluciones</Link></li>
                <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonios</Link></li>
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/appointment" className="hover:text-white transition-colors">Agendar Cita</Link></li>
                <li><Link to="/request-solution" className="hover:text-white transition-colors">Solicitar Solución</Link></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@guay.mx</li>
                <li>+52 55 1234 5678</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 guay. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
