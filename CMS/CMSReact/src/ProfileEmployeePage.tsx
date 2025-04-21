import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { parseJwt } from "./JWTParser";
import { refreshToken } from "./RefreshService";
import { checkToken } from "./AuthService";

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

  useEffect(() => {
    const initialize = async () => {
      const isValidToken = await checkToken();
      if (!isValidToken) {
        window.location.href = "/login";
        return;
      }

      const tokenRefreshed = await refreshToken();
      if (tokenRefreshed) {
        const token = localStorage.getItem("token");
        if (token) {
          const parsedToken = parseJwt(token);
          if (parsedToken) {
            setEmployee({
              firstName: parsedToken.FirstName,
              lastName: parsedToken.LastName,
              username: parsedToken.Username,
              role: parsedToken.role,
            });
          }
        }
      }
      setLoading(false);
    };

    initialize();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
              {employee
                ? `${employee.lastName} ${employee.firstName}`
                : "Hiba a lekérés során!"}
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
              {"Beosztás: " + employee?.role}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </ThemeProvider>
    </Box>
  );
}

export default App;
