import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  CardMedia,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

function App() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*useEffect(() => {
    axios
      .get("https://localhost:5000/api/Employees/refreshtoken")
      .then((response) => {
        console.log(response.data);
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }*/

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: 2,
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Card
            sx={{
              bgcolor: "#202938",
              color: "#d5d6d6",
              width: {
                xs: "100%",
                sm: "70%",
                md: "60%",
                lg: "50%",
                xl: "40%",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: "#BFA181", color: "#d5d6d6" }}
                  aria-label="recipe"
                >
                  B
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`Felhasználónév`}
              subheader={"Személyes adatok"}
            />
            <CardMedia
              component="img"
              height="194"
              image="/img/profile/profile_temp.png"
              alt="Paella dish"
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Kovács Béla
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 300,
                  textAlign: "center",
                }}
              >
                Beosztás
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default App;
