import { useState } from "react";
import "./App.css";
import { Card, CardActionArea, CardMedia, ThemeProvider, createTheme, Typography, Box } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Card sx={{
        maxWidth: '90%',
        width: '600px',
        height: 'auto',
        margin: 'auto',
        mt: 4,
        mb: 4,
        '@media (max-width: 600px)': {
          width: '100%',
        },
      }}>
        <CardActionArea>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="auto"
              image="img/RestaurantCardWP.jpg"
              alt="green iguana"
              sx={{
                width: '100%',
                height: 'auto',
              }}
            />
            <Typography
              variant="h6"
              component="div"
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
              Hover Text
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </ThemeProvider>
    </>
  );
}

export default App;