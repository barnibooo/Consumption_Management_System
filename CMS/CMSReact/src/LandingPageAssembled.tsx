import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import "./OrderPage.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <LandingPage />
  </StrictMode>
);
