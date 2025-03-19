import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar role={userRole} />
    <LandingPage />
  </StrictMode>
);
