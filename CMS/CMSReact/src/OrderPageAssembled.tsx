import { createRoot } from "react-dom/client";
import OrderPage from "./OrderPage.tsx";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser.tsx";

// User Authentication
const userRole = parseJwt(localStorage.getItem("token")!).role;

// Root Component Render
createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <OrderPage />
  </>
);
