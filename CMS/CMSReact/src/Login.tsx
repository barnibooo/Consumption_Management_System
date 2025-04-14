import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./LoginPage.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Login />
  </>
);
