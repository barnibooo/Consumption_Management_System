import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Avatar,
  CardMedia,
  IconButton,
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
  const [monogram, setMonogram] = useState<string | null>(null);

  useEffect(() => {
    const storedMonogram = localStorage.getItem("monogram");
    setMonogram(storedMonogram);
  }, []);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      axios
        .get(`https://localhost:5000/api/Employees/${refreshToken}`)
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
    } else {
      setError("No refresh token found");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 2,
        alignItems: "center", // Center the card horizontally
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
            marginTop: 2, // Add margin to the top
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: "#BFA181", color: "#d5d6d6" }}
                aria-label="recipe"
              >
                {monogram}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={employee?.username}
            subheader={"Személyes adatok"}
          />
          <CardMedia
            component="img"
            height="194"
            image="/img/profile/profile_temp.png"
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
              {employee ? `${employee.firstName} ${employee.lastName}` : "N/A"}
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
              {employee?.role}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </ThemeProvider>
    </Box>
  );
}

export default App;
