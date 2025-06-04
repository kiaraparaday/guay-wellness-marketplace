
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ResultadosPage from "./pages/ResultadosPage";
import Header from "./components/Header";
import SimpleFooter from "./components/SimpleFooter";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f0f2f8] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="fixed -top-32 -left-32 w-64 h-64 rounded-full bg-green-500 opacity-20 z-0"></div>
        <div className="fixed top-48 left-12 w-8 h-8 rounded-full bg-orange-500 opacity-20 z-0"></div>
        <div className="fixed top-1/2 -right-32 transform -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500 opacity-20 z-0"></div>
        
        <Header />
        <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/search" component={SearchResults} />
            <Route path="/resultados" component={ResultadosPage} />
            <Route render={() => <div className="text-center py-12"><h1 className="text-2xl">Página no encontrada</h1></div>} />
          </Switch>
        </div>
        <SimpleFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
