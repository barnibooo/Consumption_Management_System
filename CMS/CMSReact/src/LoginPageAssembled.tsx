import { createRoot } from "react-dom/client";
import Login from "./LoginPage.tsx";
import "./index.css";

// Root Application Assembly
createRoot(document.getElementById("root")!).render(
  <>
    <Login />
  </>
);
