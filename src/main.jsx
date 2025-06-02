
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'

// Inicializar la aplicación con StrictMode para ayudar a detectar problemas
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
