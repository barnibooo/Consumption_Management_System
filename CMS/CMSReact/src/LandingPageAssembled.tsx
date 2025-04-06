import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import "./OrderPage.css";
import { parseJwt } from "./JWTParser";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
import { Snackbar, Alert } from "@mui/material";
import Footer from "./Footer";

const App = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        // Ha nincs token, irányítsuk a login oldalra
        if (!token) {
          console.log("No token found, redirecting to login.");
          window.location.href = "/login";
          return;
        }

        // Ellenőrizzük a token érvényességét
        const isValid = await checkToken();
        if (!isValid) {
          console.log("No valid");
          window.location.href = "/login";
          return;
        }

        // Frissítsük a tokent, ha szükséges
        const isRefreshed = await refreshToken();
        if (!isRefreshed) {
          console.log("No rtoken found, redirecting to login.");
          window.location.href = "/login";
          return;
        }

        // Dekódoljuk a tokent, és állítsuk be a szerepkört
        const parsedToken = parseJwt(token);
        setRole(parsedToken.role);

        // Ellenőrizzük az `isUnauthorizedRedirect` értékét
        const isUnauthorizedRedirect = localStorage.getItem(
          "isUnauthorizedRedirect"
        );
        if (isUnauthorizedRedirect === "true") {
          localStorage.removeItem("isUnauthorizedRedirect");
          setSnackbarVisible(true);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, []);

  if (isLoading) {
    return null; // Várakozás közben ne jelenjen meg semmi
  }

  return (
    <>
      <Navbar role={role || "Guest"} />
      <LandingPage />
      <Footer />

      {snackbarVisible && (
        <Snackbar
          open={snackbarVisible}
          autoHideDuration={3000}
          onClose={() => setSnackbarVisible(false)}
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
