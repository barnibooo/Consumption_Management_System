import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./OrderPage.css";
import OrderPage from "./OrderPage.tsx";
import Navbar from "./Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <OrderPage />
  </StrictMode>
);
