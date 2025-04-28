import { createRoot } from "react-dom/client";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser.tsx";
import TicketValidation from "./TicketValidationPage.tsx";
import { Box } from "@mui/material";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <Box sx={{ overflowX: "hidden", width: "100%" }}>
    <Navbar role={userRole} />
    <TicketValidation />
  </Box>
);
