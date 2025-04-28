import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { checkToken } from "./AuthService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  // State management
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Authentication Check Effect
  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkToken();
      if (isValid) {
        window.location.href = "/";
      }
    };

    validateToken();
  }, []);

  // Form Submit Handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!userName || !password) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    setIsChecking(true);
    setError("");
    setStatusMessage("Adatok ellenőrzése folyamatban...");

    axios
      .post("https://localhost:5000/api/Auth/login", {
        userName,
        password,
      })
      .then((response) => {
        if (response.data.token && response.data.refreshToken) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          setIsChecking(false);
          setIsLoading(true);
          setStatusMessage("Sikeres belépés! Átirányítás folyamatban...");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          setError("Hiba történt: Érvénytelen válasz a szervertől.");
          setIsChecking(false);
          setStatusMessage("");
        }
      })
      .catch((error) => {
        setIsChecking(false);
        setIsLoading(false);
        setStatusMessage("");
        if (error.response && error.response.status === 401) {
          setError("Hibás felhasználónév vagy jelszó.");
        } else {
          setError(
            "Sikertelen kapcsolódás a kiszolgálószerverrel! Próbálja újra később!"
          );
        }
      });
  };

  // Component Render
  return (
    // Main Container
    <Box
      sx={{
        backgroundColor: "#0F1827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      {/* Login Card */}
      <Card
        sx={{
          color: "#d5d6d6",
          backgroundColor: "#202938",
          width: {
            xs: "95%",
            sm: "85%",
            md: "55%",
            lg: "60%",
          },
          height: "auto",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          maxHeight: { xs: "100vh", sm: "none" },
        }}
      >
        {/* Login Image - Desktop Only */}
        {!isSmallScreen && (
          <CardMedia
            component="img"
            sx={{
              width: "40%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "right",
            }}
            image="/img/main/login_sample.png"
            alt="Login sample"
          />
        )}

        {/* Login Form Container */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: isSmallScreen ? "100%" : "60%",
            flex: 1,
            padding: { xs: 0, sm: 3, md: 4 },
            paddingBottom: { xs: 2, sm: 3, md: 4 },
            paddingTop: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Header Section */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 400,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              textAlign: "center",
            }}
          >
            Consumption Management System
          </Typography>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
              fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
              textAlign: "center",
            }}
          >
            Üdvözöljük!
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          >
            Kérjük jelentkezzen be!
          </Typography>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Username Field */}
            <TextField
              sx={{
                width: { xs: "90%", sm: "80%", md: "70%" },
                height: "Auto",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#d5d6d6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d5d6d6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#BFA181",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#d5d6d6",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#BFA181",
                },
                "& .MuiInputBase-input": {
                  color: "#d5d6d6",
                  caretColor: "#d5d6d6",
                  padding: { xs: "12px 14px", sm: "16.5px 14px" },
                },
                marginBottom: { xs: 1, sm: 2 },
              }}
              required
              id="outlined-search"
              label="Felhasználónév"
              type="search"
              margin="dense"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            {/* Password Field */}
            <TextField
              sx={{
                width: { xs: "90%", sm: "80%", md: "70%" },
                height: "Auto",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#d5d6d6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d5d6d6",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#BFA181",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#d5d6d6",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#BFA181",
                },
                "& .MuiInputBase-input": {
                  color: "#d5d6d6",
                  caretColor: "#d5d6d6",
                  padding: { xs: "12px 14px", sm: "16.5px 14px" },
                },
                marginBottom: { xs: 1, sm: 2 },
              }}
              required
              id="outlined-password-input"
              label="Jelszó"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#d5d6d6" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

            {/* Error Message */}
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2, textAlign: "center" }}
              >
                {error}
              </Typography>
            )}

            {/* Loading State */}
            {(isChecking || isLoading) && (
              <>
                <Typography
                  variant="body2"
                  color={isLoading ? "success" : "primary"}
                  sx={{ marginBottom: 2, textAlign: "center" }}
                >
                  {statusMessage}
                </Typography>
                <CircularProgress
                  sx={{ marginBottom: 2 }}
                  color={isLoading ? "success" : "primary"}
                />
              </>
            )}

            {/* Submit Button */}
            {!isChecking && !isLoading && (
              <Button
                sx={{
                  width: { xs: "90%", sm: "80%", md: "70%" },
                  height: "Auto",
                  backgroundColor: "#BFA181",
                  marginBottom: { xs: 1, sm: 2 },
                  padding: { xs: "8px", sm: "12px" },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  "&:hover": {
                    backgroundColor: "#9e9386",
                  },
                }}
                variant="contained"
                endIcon={<LoginIcon />}
                type="submit"
              >
                Belépés
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
