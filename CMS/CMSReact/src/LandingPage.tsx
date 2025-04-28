import {
  Card,
  CardActionArea,
  CardMedia,
  ThemeProvider,
  createTheme,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { parseJwt } from "./JWTParser";
import React from "react";

// Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

// Global Styles
const style = document.createElement("style");
style.textContent = `
  body {
    background-color: #0f1827;
    color: #d5d6d6;
    margin: 0;
    padding: 0;
  }
`;
document.head.appendChild(style);

// Card Component Factory
const cardContent = (image: string, text: string, link: string) => (
  <CardActionArea onClick={() => (window.location.href = link)}>
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={text}
        sx={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
        }}
      />
      <Typography
        variant="h2"
        component="div"
        fontFamily="Roboto, sans-serif"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: 0,
          transition: "opacity 0.3s",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  </CardActionArea>
);

const commonBoxStyle = {
  width: {
    xs: "100%",
    sm: "80%",
    md: "65%",
    lg: "45%",
    xl: "35%",
  },
};

// Main Component
function Landing() {
  // State Management
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Role Authentication Effect
  useEffect(() => {
    const handleRole = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const parsedToken = parseJwt(token);
        setRole(parsedToken.role);
        setIsLoading(false);
      }
    };

    handleRole();
  }, []);

  // Loading State
  if (isLoading) {
    return null;
  }

  // Main Render
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {/* Main Container */}
        <Box
          sx={{
            width: "100%", // Changed from 100%
            backgroundColor: "#0f1827",
            display: "flex", // Added
            justifyContent: "center", // Added
            overflowX: "hidden",
          }}
        >
          {/* Card Grid Container */}
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start" // Added
            gap={2} // Increased from 2
            sx={{
              width: "100%",
              maxWidth: "100vw", // Added responsive padding
              py: 4,
            }}
          >
            {/* Ticket Sales Card - Admin & TicketAssistant Only */}
            {role === "Admin" || role === "TicketAssistant" ? (
              <Box sx={commonBoxStyle}>
                <Card sx={{ height: "100%" }}>
                  {cardContent(
                    "/img/landing/ticket_temp.png",
                    "Jegyértékesítés",
                    "ticket"
                  )}
                </Card>
              </Box>
            ) : null}

            {/* Ticket Validation Card - Admin, TicketAssistant & RestaurantAssistant */}
            {role === "Admin" ||
            role === "TicketAssistant" ||
            role === "RestaurantAssistant" ? (
              <Box sx={commonBoxStyle}>
                <Card sx={{ height: "100%" }}>
                  {cardContent(
                    "/img/landing/ticketcheck_temp.png",
                    "Jegyellenőrzés",
                    "ticketValidation"
                  )}
                </Card>
              </Box>
            ) : null}

            {/* Registration Card - Admin Only */}
            {role === "Admin" ? (
              <Box sx={commonBoxStyle}>
                <Card sx={{ height: "100%" }}>
                  {cardContent(
                    "/img/landing/registration_temp.png",
                    "Regisztráció",
                    "registration"
                  )}
                </Card>
              </Box>
            ) : null}

            {/* Daily Specials Card - Admin Only */}
            {role === "Admin" ? (
              <Box sx={commonBoxStyle}>
                <Card sx={{ height: "100%" }}>
                  {cardContent(
                    "/img/landing/daily_temp.png",
                    "Napi ajánlat kezelő",
                    "dailyspecials"
                  )}
                </Card>
              </Box>
            ) : null}

            {/* Restaurant Card - Admin & RestaurantAssistant Only */}
            {role === "Admin" || role === "RestaurantAssistant" ? (
              <Box sx={commonBoxStyle}>
                <Card sx={{ height: "100%" }}>
                  {cardContent(
                    "/img/landing/restaurant_temp.png",
                    "Étterem",
                    "order"
                  )}
                </Card>
              </Box>
            ) : null}

            {/* Checkout Card - Admin & TicketAssistant Only */}
            {role === "Admin" || role === "TicketAssistant" ? (
              <Box sx={commonBoxStyle}>
                <Card sx={{ height: "100%" }}>
                  {cardContent(
                    "/img/landing/checkout_temp.png",
                    "Véglegesítés",
                    "checkout"
                  )}
                </Card>
              </Box>
            ) : null}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Landing;
