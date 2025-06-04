
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'

// React 16 compatible rendering
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
