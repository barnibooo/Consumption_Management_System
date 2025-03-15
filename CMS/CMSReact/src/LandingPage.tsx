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
//import { refreshToken } from "./AuthService";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const handleRefreshToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login.html";
        return;
      }
    };

    handleRefreshToken();
  }, []);

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
          <Box
            sx={{
              width: { xs: "100%", sm: "50%", md: "50%", lg: "35%", xl: "35%" },
              p: 1,
            }}
          >
            <Card sx={{ maxWidth: "100%", height: "auto" }}>
              {cardContent(
                "/img/landing/registration_temp.png",
                "Regisztráció",
                "registrationpage.html"
              )}
            </Card>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "50%", md: "50%", lg: "35%", xl: "35%" },
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
          <Box
            sx={{
              width: { xs: "100%", sm: "50%", md: "50%", lg: "35%", xl: "35%" },
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
          <Box
            sx={{
              width: { xs: "100%", sm: "50%", md: "50%", lg: "35%", xl: "35%" },
              p: 1,
            }}
          >
            <Card sx={{ maxWidth: "100%", height: "auto" }}>
              {cardContent(
                "/img/landing/egyeb_temp.png",
                "Folyamatban...",
                "landingpage.html"
              )}
            </Card>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
