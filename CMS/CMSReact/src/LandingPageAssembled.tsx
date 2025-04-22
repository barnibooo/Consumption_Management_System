import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import { parseJwt } from "./JWTParser";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
import { Snackbar, Alert } from "@mui/material";

/**
 * Main Application Component
 * Handles authentication, routing, and main layout
 */
const Landing = () => {
  // State Management
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  // Authentication & Initialization Effect
  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Token Validation
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        // Token Checks
        const isValid = await checkToken();
        if (!isValid) {
          window.location.href = "/login";
          return;
        }

        // Token Refresh
        const isRefreshed = await refreshToken();
        if (!isRefreshed) {
          window.location.href = "/login";
          return;
        }

        // Role Assignment
        const parsedToken = parseJwt(token);
        setRole(parsedToken.role);

        // Unauthorized Redirect Check
        const isUnauthorizedRedirect = localStorage.getItem(
          "isUnauthorizedRedirect"
        );
        if (isUnauthorizedRedirect === "true") {
          localStorage.removeItem("isUnauthorizedRedirect");
          setSnackbarVisible(true);
        }
      } catch (error) {
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, []);

  // Loading State
  if (isLoading) {
    return null;
  }

  // Main Application Render
  return (
    <>
      <Navbar role={role || "Guest"} />
      <LandingPage />

      {/* Unauthorized Access Notification */}
      {snackbarVisible && (
        <Snackbar
          open={snackbarVisible}
          autoHideDuration={3000}
          onClose={() => setSnackbarVisible(false)}
        >
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            Az oldal használatához magasabb jogosultság szükséges vagy a
            kapcsolat megszakadt!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

// Root Application Render
createRoot(document.getElementById("root")!).render(<Landing />);
