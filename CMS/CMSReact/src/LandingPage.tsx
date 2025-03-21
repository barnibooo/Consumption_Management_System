import "./OrderPage.css";
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
import { checkToken } from "./AuthService";
import { parseJwt } from "./JWTParser";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
        fontFamily={"Roboto"}
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

function App() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const isValid = await checkToken();

      if (!isValid) {
        window.location.href = "/login";
        return;
      }

      const token = localStorage.getItem("token");
      if (token) {
        const parsedToken = parseJwt(token);
        setRole(parsedToken.role);
        setIsLoading(false);
      } else {
        window.location.href = "/login";
      }
    };

    handleAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 4, mb: 4, width: "100%" }}
        >
          {role === "Admin" || role === "TicketAssistant" ? (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "50%",
                  lg: "35%",
                  xl: "35%",
                },
                p: 1,
              }}
            >
              <Card sx={{ maxWidth: "100%", height: "auto" }}>
                {cardContent(
                  "/img/landing/ticket_temp.png",
                  "Jegyértékesítés",
                  "tickets"
                )}
              </Card>
            </Box>
          ) : null}
          {role === "Admin" ||
          role === "TicketAssistant" ||
          role === "RestaurantAssistant" ? (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "50%",
                  lg: "35%",
                  xl: "35%",
                },
                p: 1,
              }}
            >
              <Card sx={{ maxWidth: "100%", height: "auto" }}>
                {cardContent(
                  "/img/landing/ticketcheck_temp.png",
                  "Jegyellenőrzés",
                  "ticketvalidation"
                )}
              </Card>
            </Box>
          ) : null}
          {role === "Admin" ? (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "50%",
                  lg: "35%",
                  xl: "35%",
                },
                p: 1,
              }}
            >
              <Card sx={{ maxWidth: "100%", height: "auto" }}>
                {cardContent(
                  "/img/landing/registration_temp.png",
                  "Regisztráció",
                  "registration"
                )}
              </Card>
            </Box>
          ) : null}
          {role === "Admin" || role === "RestaurantAssistant" ? (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "50%",
                  lg: "35%",
                  xl: "35%",
                },
                p: 1,
              }}
            >
              <Card sx={{ maxWidth: "100%", height: "auto" }}>
                {cardContent(
                  "/img/landing/restaurant_temp.png",
                  "Étterem",
                  "restaurant"
                )}
              </Card>
            </Box>
          ) : null}
          {role === "Admin" || role === "TicketAssistant" ? (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "50%",
                  md: "50%",
                  lg: "35%",
                  xl: "35%",
                },
                p: 1,
              }}
            >
              <Card sx={{ maxWidth: "100%", height: "auto" }}>
                {cardContent(
                  "/img/landing/checkout_temp.png",
                  "Vendég munkamenet zárása",
                  "customercheckout"
                )}
              </Card>
            </Box>
          ) : null}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
