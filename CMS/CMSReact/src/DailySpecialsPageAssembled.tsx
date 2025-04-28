import { createRoot } from "react-dom/client";
import DailySpecials from "./DailySpecialsPage.tsx";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser.tsx";

// Authentication
const userRole = parseJwt(localStorage.getItem("token")!).role;

// Root Application Assembly
createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <DailySpecials />
  </>
);
