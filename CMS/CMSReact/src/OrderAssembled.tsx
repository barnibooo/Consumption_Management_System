import { createRoot } from "react-dom/client";
import "./OrderPage.css";
import OrderPage from "./OrderPage.tsx";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser";
import Footer from "./Footer.tsx";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <OrderPage />
    <Footer />
  </>
);
