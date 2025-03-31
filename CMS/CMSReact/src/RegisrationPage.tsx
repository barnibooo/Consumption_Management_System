import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Alert,
  Button,
  Snackbar,
  TextField,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
import axios from "axios";
import { parseJwt } from "./JWTParser";
import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RegistrationCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        setIsUnauthorized(true); // Itt jelenik meg a hiba
        return;
      }

      try {
        const isValidToken = await checkToken();
        if (!isValidToken) {
          console.error("Invalid token. Redirecting to login...");
          setIsUnauthorized(true); // Ha a token érvénytelen, folyamatosan újra megjelenítjük a hibát
          return;
        }

        setTokenValidated(true);
        await refreshToken(); // A token frissítése
        setTokenRefreshed(true);
        setDataFetched(true);

        // Fetch roles from API
        const response = await axios.get(
          "https://localhost:5000/api/Employees/roles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRoles(response.data);

        setIsUnauthorized(false);
      } catch (error) {
        console.error("Error during token validation or data fetching:", error);
        setIsUnauthorized(true); // Ha hiba történt, folyamatosan újra megjelenik a hiba
      }
    };

    validateAndFetchData();
  }, []);

  if (isUnauthorized) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Snackbar open={isUnauthorized} autoHideDuration={6000}>
          <Alert
            onClose={() => setIsUnauthorized(true)}
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Az oldal használatához magasabb jogosultság szükséges!
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  const handleRegister = async () => {
    try {
      const employeeData = {
        username,
        firstName,
        lastName,
        password,
        role,
      };

      await axios.post(
        "https://localhost:5000/api/Auth/register",
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOpenSuccessSnackbar(true);
      setError(null);
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
      setOpenSuccessSnackbar(false);
    }
  };

  const isFormValid = () => {
    return (
      username?.trim() !== "" &&
      firstName?.trim() !== "" &&
      lastName?.trim() !== "" &&
      password?.trim() !== "" &&
      role.trim() !== ""
    );
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
        padding: 4,
        boxSizing: "border-box",
        overflowY: "auto",
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
        <CardMedia
          component="img"
          sx={{
            width: isSmallScreen ? "0%" : "40%",
            height: isSmallScreen ? "0%" : "auto",
            objectFit: "cover",
            objectPosition: "left",
          }}
          image="/img/main/login_sample.png"
          alt="Registration sample"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: isSmallScreen ? "100%" : "50%",
            flex: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 400,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
              fontSize: { xs: 20, sm: 20, md: 20, lg: 22, xl: 30 },
            }}
          ></Typography>
          <Typography
            gutterBottom
            variant="h4"
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
            Új munkaválláló regisztrációja
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          ></Typography>
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
            id="outlined-username"
            label="Felhasználónév"
            type="text"
            margin="dense"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
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
            id="outlined-firstname"
            label="Keresztnév"
            type="text"
            margin="dense"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
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
            id="outlined-lastname"
            label="Vezetéknév"
            type="text"
            margin="dense"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
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
            id="outlined-password"
            label="Jelszó"
            type="password"
            autoComplete="new-password"
            margin="dense"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl
            sx={{
              width: "70%",
              marginBottom: 2,
              marginTop: 1,
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
              },
              "& .MuiSelect-icon": {
                color: "#d5d6d6",
              },
              "& .Mui-focused .MuiSelect-icon": {
                color: "#BFA181",
              },
            }}
          >
            <InputLabel id="role-select-label">Munkakör</InputLabel>
            <Select
              required
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Munkakör"
              onChange={(event: SelectChangeEvent) =>
                setRole(event.target.value)
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#202938",
                    "& .MuiMenuItem-root": {
                      color: "#d5d6d6",
                      "&:hover": {
                        backgroundColor: "#37404f",
                      },
                    },
                  },
                },
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{
              m: 2,
              backgroundColor: "#BFA181",
              width: "80%",
              "&.Mui-disabled": {
                backgroundColor: "#9e9386",
                color: "#d5d6d6",
              },
            }}
            variant="contained"
            endIcon={<PersonAddIcon />}
            onClick={handleRegister}
            disabled={!isFormValid()}
          >
            Regisztráció
          </Button>
          <Snackbar
            open={openSuccessSnackbar && !error && !isUnauthorized}
            autoHideDuration={6000}
            onClose={() => setOpenSuccessSnackbar(false)}
          >
            <Alert
              onClose={() => setOpenSuccessSnackbar(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Sikeres regisztráció!
            </Alert>
          </Snackbar>

          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert
              onClose={() => setError(null)}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Sikertelen regisztráció!
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegistrationCard;
