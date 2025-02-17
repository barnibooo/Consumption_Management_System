<<<<<<< Updated upstream
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Side from "./Sidebar.tsx";
>>>>>>> Stashed changes

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< Updated upstream
    <App />
  </StrictMode>,
)
=======
    <Side />
  </StrictMode>
);
>>>>>>> Stashed changes
