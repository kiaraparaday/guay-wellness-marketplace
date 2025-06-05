
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Header from "./components/Header";
import SimpleFooter from "./components/SimpleFooter";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-4">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route render={() => <div className="text-center py-12"><h1 className="text-2xl">Página no encontrada</h1></div>} />
          </Switch>
        </main>
        <SimpleFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
