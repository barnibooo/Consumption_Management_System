import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TicketPage from "./TicketPage.tsx";
import Navbar from "./Navbar.tsx";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";
import Footer from "./Footer.tsx";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <Navbar role={userRole} />
    <TicketPage />
    <Footer />
  </>
  // </StrictMode>
);
