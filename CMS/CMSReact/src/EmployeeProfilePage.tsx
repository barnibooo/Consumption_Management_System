import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { parseJwt } from "./JWTParser";
import { refreshToken } from "./RefreshService";
import { checkToken } from "./AuthService";

// Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Global Styles
const style = document.createElement("style");
style.textContent = `
  body {
    background-color: #0f1827;
    color: #d5d6d6;
    margin: 0;
    padding: 0;
  }
`;
document.head.appendChild(style);

// Type Definitions
interface Employee {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}

function EmployeeProfile() {
  // State Management
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  // Authentication & Data Initialization
  useEffect(() => {
    const initialize = async () => {
      // Token Validation
      const isValidToken = await checkToken();
      if (!isValidToken) {
        window.location.href = "/login";
        return;
      }

      // Token Refresh & Employee Data Extraction
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

  // Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // Main Component Render
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 2,
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        {/* Profile Card */}
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
            marginTop: 2,
          }}
        >
          {/* Profile Image */}
          <CardMedia
            component="img"
            height="194"
            image="/img/profile/profile_temp.png"
          />
          {/* Profile Details */}
          <CardContent>
            {/* Employee Name */}
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

            {/* Employee Role */}
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
        </Card>
      </ThemeProvider>
    </Box>
  );
}

export default EmployeeProfile;
