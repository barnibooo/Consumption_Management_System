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
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { checkToken } from "./AuthService";

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

// JWT parser
function parseJwt(token: string): any {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function App() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Page refreshed");
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
        window.location.href = "/login.html";
      }
    };

    handleAuth();
  }, []);

  if (isLoading) {
    return null; // Render nothing while checking the token
  }

  return (
    <>
      <Navbar />
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
                  "Jegyeladás",
                  "tickets.html"
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
                  "/img/landing/egyeb_temp.png",
                  "Jegyellenőrzés",
                  "lanfingpage.html"
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
                  "restaurant.html"
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
                  "/img/landing/egyeb_temp.png",
                  "Kicsekkolás",
                  "landingpage.html"
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
