import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./OrderPage.css";
import RegistrationPage from "./RegisrationPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RegistrationPage />
  </StrictMode>
);