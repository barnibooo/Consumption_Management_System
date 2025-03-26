import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./OrderPage.css";
import RegistrationPage from "./RegisrationPage.tsx";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <RegistrationPage />
  </>
);
