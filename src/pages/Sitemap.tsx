
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, ArrowRight, Search, Filter, Eye, Calendar, 
  Download, ArrowLeft, Users, Clock, Globe, FileText,
  Target, Layers, Building, HeartHandshake, Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Sitemap: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const pages = {
    home: {
      title: 'Página Principal',
      route: '/',
      description: 'Landing page con dimensiones y navegación principal',
      components: ['Hero Section', 'Tabs Navegación', 'Grid Dimensiones', 'CTA Final'],
      connections: ['solutions', 'dimension', 'appointment'],
      icon: Home,
      color: 'bg-blue-500'
    },
    solutions: {
      title: 'Catálogo Completo',
      route: '/solutions',
      description: 'Vista completa con filtros avanzados',
      components: ['Filtros Sticky', 'Grid Soluciones', 'Estados Vacíos'],
      connections: ['solution'],
      icon: Layers,
      color: 'bg-green-500'
    },
    dimension: {
      title: 'Vista por Dimensión',
      route: '/dimension/:id',
      description: 'Soluciones agrupadas por competencias',
      components: ['Hero Dimensión', 'Filtros Contextuales', 'Secciones Competencia'],
      connections: ['competency', 'solution'],
      icon: Target,
      color: 'bg-purple-500'
    },
    competency: {
      title: 'Vista por Competencia',
      route: '/competency/:id',
      description: 'Soluciones específicas de una competencia',
      components: ['Header Competencia', 'Filtros Específicos', 'Grid Soluciones'],
      connections: ['solution'],
      icon: Brain,
      color: 'bg-orange-500'
    },
    solution: {
      title: 'Detalle de Solución',
      route: '/solution/:id',
      description: 'Información completa con CTAs principales',
      components: ['Galería', 'Info Detallada', 'CTA Sticky', 'Facilitador'],
      connections: ['appointment'],
      icon: FileText,
      color: 'bg-red-500'
    },
    appointment: {
      title: 'Agenda',
      route: '/appointment',
      description: 'Redirección a Google Calendar',
      components: ['Spinner', 'Redirección Automática', 'Link Fallback'],
      connections: [],
      icon: Calendar,
      color: 'bg-indigo-500'
    }
  };

  const dimensions = [
    { id: 'psychosocial', name: 'Factores Psicosociales', icon: Brain, color: 'text-guay-purple' },
    { id: 'climate', name: 'Clima Laboral', icon: Users, color: 'text-guay-green' },
    { id: 'culture', name: 'Cultura Organizacional', icon: Building, color: 'text-blue-600' },
    { id: 'dei', name: 'Diversidad, Equidad e Inclusión', icon: HeartHandshake, color: 'text-guay-orange' }
  ];

  const userFlows = [
    {
      name: 'Exploración por Dimensiones',
      flow: ['home', 'dimension', 'competency', 'solution', 'appointment'],
      description: 'Usuario explora desde dimensiones específicas'
    },
    {
      name: 'Búsqueda Directa',
      flow: ['home', 'solutions', 'solution', 'appointment'],
      description: 'Usuario va directo al catálogo completo'
    },
    {
      name: 'Navegación Contextual',
      flow: ['home', 'dimension', 'solution', 'appointment'],
      description: 'Usuario accede directamente a soluciones desde dimensión'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 font-quicksand">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-guay-dark-blue">Mapa de Navegación - Marketplace Guay</h1>
              <p className="text-muted-foreground">Diagrama interactivo de flujos y páginas</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/">← Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mapa Principal de Páginas */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-guay-dark-blue">Páginas Principales</h2>
          
          <div className="relative">
            {/* Grid de páginas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(pages).map(([key, page]) => {
                const IconComponent = page.icon;
                return (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedPage === key ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPage(selectedPage === key ? null : key)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${page.color} text-white`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{page.title}</div>
                          <div className="text-xs text-muted-foreground font-mono">{page.route}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{page.description}</p>
                      
                      {/* Componentes */}
                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-600 mb-2">Componentes:</div>
                        <div className="flex flex-wrap gap-1">
                          {page.components.map((comp, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Conexiones */}
                      {page.connections.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-gray-600 mb-2">Conecta con:</div>
                          <div className="flex flex-wrap gap-1">
                            {page.connections.map((conn, idx) => (
                              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                {pages[conn as keyof typeof pages]?.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dimensiones Específicas */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-guay-dark-blue">Dimensiones del Marketplace</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dimensions.map((dim) => {
              const IconComponent = dim.icon;
              return (
                <Card key={dim.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className={`w-5 h-5 ${dim.color}`} />
                      <div className="text-sm font-medium">{dim.name}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      /dimension/{dim.id}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Flujos de Usuario */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-guay-dark-blue">Flujos de Usuario Principales</h2>
          
          <div className="space-y-6">
            {userFlows.map((flow, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{flow.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{flow.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 flex-wrap">
                    {flow.flow.map((pageKey, pageIdx) => (
                      <React.Fragment key={pageKey}>
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${pages[pageKey as keyof typeof pages].color} text-white`}>
                            {React.createElement(pages[pageKey as keyof typeof pages].icon, { className: "w-4 h-4" })}
                          </div>
                          <div className="text-sm font-medium">
                            {pages[pageKey as keyof typeof pages].title}
                          </div>
                        </div>
                        {pageIdx < flow.flow.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Elementos Persistentes */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-guay-dark-blue">Elementos Persistentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Header Global</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Logo GUAY → /</li>
                  <li>• Navegación principal</li>
                  <li>• Botón "Agendar cita"</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Breadcrumbs</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Navegación contextual</li>
                  <li>• Mantiene historial</li>
                  <li>• Regreso inteligente</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">CTAs Principales</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "Agendar cita" (todas las páginas)</li>
                  <li>• "Solicitar solución personalizada"</li>
                  <li>• "Descargar información" (detalles)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Información de exportación */}
        <section className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3 text-guay-dark-blue">💡 Para exportar este diagrama:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Opción 1: Screenshot</h4>
              <p className="text-muted-foreground">Toma screenshot de esta página para documentación rápida</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Opción 2: Recrear en Figma/Miro</h4>
              <p className="text-muted-foreground">Usa la información del texto estructurado para crear diagramas profesionales</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sitemap;
