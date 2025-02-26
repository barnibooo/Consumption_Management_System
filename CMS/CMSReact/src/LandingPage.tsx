import { useState } from "react";
import "./App.css";
import { Card, CardActionArea, CardMedia, ThemeProvider, createTheme, Typography, Box, Grid } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const cardContent = (image: string, text: string, link: string) => (
    <CardActionArea onClick={() => window.location.href = link}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={text}
          sx={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />
        <Typography
          variant="h2"
          component="div"
          fontFamily={"roboto"}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': {
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
      <ThemeProvider theme={darkTheme}>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card sx={{ maxWidth: '100%', height: 'auto' }}>
              {cardContent("img/registration_card_temporary.jpg", "Regisztráció", "registrationpage.html")}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card sx={{ maxWidth: '100%', height: 'auto' }}>
              {cardContent("img/tickets_card_temporary.jpg", "Jegyeladás", "landingpage.html")}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card sx={{ maxWidth: '100%', height: 'auto' }}>
              {cardContent("img/RestaurantCardWP.jpg", "Étterem", "restaurant.html")}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card sx={{ maxWidth: '100%', height: 'auto' }}>
              {cardContent("img/egyeb_card_temporary.jpg", "Folyamatban...", "landingpage.html")}
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;