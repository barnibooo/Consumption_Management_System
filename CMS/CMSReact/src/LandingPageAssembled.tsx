import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";
import UnauthorizedMessage from "./UnauthorizedMessage";
import { Snackbar, Alert } from "@mui/material";

const token = localStorage.getItem("token");
const decodedToken = token ? parseJwt(token) : null;

const App = () => {
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(() => {
    const isUnauthorizedRedirect = localStorage.getItem(
      "isUnauthorizedRedirect"
    );
    if (isUnauthorizedRedirect === "true") {
      localStorage.removeItem("isUnauthorizedRedirect"); // Törli az értéket a localStorage-ból
      return true;
    }
    return false;
  });

  return (
    <>
      <Navbar role={decodedToken?.role || "Guest"} />
      <LandingPage />

      {snackbarVisible && ( // Feltételes renderelés
        <Snackbar
          open={snackbarVisible}
          autoHideDuration={5000}
          onClose={() => setSnackbarVisible(false)} // Állapot frissítése
        >
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            Az oldal használatához magasabb jogosultság szükséges!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
