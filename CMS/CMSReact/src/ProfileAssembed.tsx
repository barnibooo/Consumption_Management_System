import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./OrderPage.css";
import ProfilePage from "./ProfilePage.tsx";
import Navbar from "./Navbar.tsx";
import { parseJwt } from "./JWTParser";

const userRole = parseJwt(localStorage.getItem("token")!).role;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar role={userRole} />
    <ProfilePage />
  </StrictMode>
);
