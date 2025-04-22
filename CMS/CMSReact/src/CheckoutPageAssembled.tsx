import { createRoot } from "react-dom/client";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser.tsx";
import CheckoutPage from "./CheckoutPage.tsx";

// User Authentication
const userRole = parseJwt(localStorage.getItem("token")!).role;

// Root Component Render
createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <CheckoutPage />
  </>
);
