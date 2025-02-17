import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navigator from "./Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navigator/>
  </StrictMode>
);
