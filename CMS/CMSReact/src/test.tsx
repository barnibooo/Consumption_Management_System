import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Proba from "./Proba.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Proba />
  </StrictMode>
);
