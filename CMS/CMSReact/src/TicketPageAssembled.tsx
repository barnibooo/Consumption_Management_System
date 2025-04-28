import { createRoot } from "react-dom/client";
import TicketPage from "./TicketPage.tsx";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser.tsx";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <>
    <Navbar role={userRole} />
    <TicketPage />
  </>
);
