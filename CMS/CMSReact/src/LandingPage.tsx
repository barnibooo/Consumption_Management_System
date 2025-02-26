import { useState } from "react";
import "./App.css";
import { Card, CardActionArea, CardMedia, CardContent, Typography, ThemeProvider, createTheme } from "@mui/material";

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
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </ThemeProvider>
    </>
  );
}

export default App;
