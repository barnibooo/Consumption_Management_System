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
  const [isUnauthorized, setIsUnauthorized] = useState(
    !decodedToken || decodedToken.role !== "Admin"
  );
const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  useEffect(() => {
    console.log(showSnackbar);
    // Ellenőrizzük a flag-et a localStorage-ban
    const isUnauthorizedRedirect = localStorage.getItem("isUnauthorizedRedirect");
    if (isUnauthorizedRedirect === "true") {
      setShowSnackbar(true);
      console.log("Show snackbar");
      console.log(showSnackbar);
      setShowSnackbar(false);
      console.log(showSnackbar);
      localStorage.removeItem("isUnauthorizedRedirect"); // Töröljük a flag-et
    }
  }, []); // Csak egyszer fusson le az oldal betöltésekor
  useEffect(() => {
  console.log("Snackbar állapota megváltozott:", showSnackbar);
  }, [showSnackbar]);
  const handleResetUnauthorized = () => {
    setIsUnauthorized(false); // Visszaállítjuk az isUnauthorized értékét false-ra
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false); // Bezárjuk a Snackbar-t
  };

  return (
    <>
      <Navbar role={decodedToken?.role || "Guest"} />
      <LandingPage />
      <UnauthorizedMessage
        isUnauthorized={isUnauthorized}
        onResetUnauthorized={handleResetUnauthorized}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
          Az oldal használatához magasabb jogosultság szükséges!
        </Alert>
      </Snackbar>
    </>
  );
};

createRoot(document.getElementById("root")!).render(<App />);