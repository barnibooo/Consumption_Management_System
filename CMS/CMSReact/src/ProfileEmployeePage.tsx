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
      .get("https://localhost:5000/api/Employees/1")
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
                sm: "90%",
                md: "70%",
                lg: "60%",
                xl: "50%",
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#BFA181" }} aria-label="recipe">
                  {employee?.firstName.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`Kovács Béla`}
              subheader={employee?.role}
            />
            <CardMedia
              component="img"
              height="194"
              image="/img/landing/egyeb_temp.png"
              alt="Paella dish"
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "30px",
                  textIndent: "20px",
                  fontWeight: 500,
                }}
              >
                Személyes Adatok
              </Typography>
              <Divider sx={{ fontFamily: "Arial" }}>Vezetéknév</Divider>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 350,
                }}
              >
                Kovács
              </Typography>
              <Divider sx={{ fontFamily: "Arial" }}>Keresztnév</Divider>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 350,
                }}
              >
                Béla
              </Typography>
              <Divider sx={{ fontFamily: "Arial" }}>Felhasználónév</Divider>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 350,
                }}
              >
                kbela
              </Typography>
              <Divider sx={{ fontFamily: "Arial" }}>Beosztás</Divider>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 350,
                }}
              >
                Takarító
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
