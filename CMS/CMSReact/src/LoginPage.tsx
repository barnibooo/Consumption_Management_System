import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, TextField, useMediaQuery, useTheme } from "@mui/material";

function MediaCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!userName || !password) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }
    setIsLoading(true);
    axios
      .post("https://localhost:5000/api/Auth/login", {
        userName,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.token && response.data.refreshToken) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          setError("");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setError("Hiba történt: Érvénytelen válasz a szervertől.");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Hibás felhasználónév vagy jelszó.");
        } else {
          setError("Hiba történt: " + error.message);
        }
        setIsLoading(false);
      });
  };

  return (
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
      <Card
        sx={{
          color: "#d5d6d6",
          backgroundColor: "#202938",
          width: {
            xs: "90%",
            sm: "70%",
            md: "55%",
            lg: "60%",
          },
          height: "auto",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
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
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: isSmallScreen ? "100%" : "60%",
            flex: 1,
          }}
        >
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
            Kérjük jelentkezz be!
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                width: "70%",
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
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#BFA181",
                },
                "& .MuiInputBase-input": {
                  color: "#d5d6d6",
                  caretColor: "#d5d6d6",
                },
                marginBottom: 2,
              }}
              required
              id="outlined-search"
              label="Felhasználónév"
              type="search"
              margin="dense"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              sx={{
                width: "70%",
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
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#BFA181",
                },
                "& .MuiInputBase-input": {
                  color: "#d5d6d6",
                  caretColor: "#d5d6d6",
                },
                marginBottom: 2,
              }}
              required
              id="outlined-password-input"
              label="Jelszó"
              type="password"
              autoComplete="current-password"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
            {isLoading ? (
              <>
                <Typography
                  variant="body2"
                  color="success"
                  sx={{ marginBottom: 2 }}
                >
                  Sikeres belépés, átirányítás...
                </Typography>
                <CircularProgress sx={{ marginBottom: 2 }} />
              </>
            ) : (
              <Button
                sx={{
                  width: "70%",
                  height: "Auto",
                  backgroundColor: "#BFA181",
                  marginBottom: 2,
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

export default MediaCard;
