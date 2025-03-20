import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./Navbar.tsx";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";
import TicketValidation from "./TicketValidation.tsx";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar role={userRole} />
    <TicketValidation />
  </StrictMode>
);
