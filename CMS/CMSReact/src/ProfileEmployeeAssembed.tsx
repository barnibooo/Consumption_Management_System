import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./OrderPage.css";
import ProfilePage from "./ProfileEmployeePage.tsx";
import Navbar from "./Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar />
    <ProfilePage />
  </StrictMode>
);
