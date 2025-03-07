import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TicketPage from "./TicketPage.tsx";
import Navbar from "./Navbar.tsx";
import "./OrderPage.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <TicketPage />
  </StrictMode>
);
