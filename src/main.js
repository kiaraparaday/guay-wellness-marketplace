
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StrictMode } from 'react';

// Initialize the application with StrictMode for React 16.13.1
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
