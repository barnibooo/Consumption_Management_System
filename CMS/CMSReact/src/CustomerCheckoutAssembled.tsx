import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./Navbar.tsx";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";
import CustomerCheckout from "./CustomerCheckout.tsx";
import Footer from "./Footer.tsx";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <CustomerCheckout />
    <Footer />
  </>
);
