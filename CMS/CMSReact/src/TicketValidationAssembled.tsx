import { createRoot } from "react-dom/client";
import Navbar from "./Navbar.tsx";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";
import TicketValidation from "./TicketValidation.tsx";
import { Box } from "@mui/material";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <Box sx={{ overflowX: "hidden", width: "100%" }}>
    <Navbar role={userRole} />
    <TicketValidation />
  </Box>
);
