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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
import axios from "axios";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function RegistrationCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
        setIsUnauthorized(true);
        return;
      }

      try {
        const isValidToken = await checkToken();
        if (!isValidToken) {
          setIsUnauthorized(true);
          return;
        }

        await refreshToken();

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
        setIsUnauthorized(true);
      }
    };

    validateAndFetchData();
  }, []);

  if (isUnauthorized) {
    localStorage.setItem("isUnauthorizedRedirect", "true");
    window.location.href = "/";
    return null;
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
      if (error.response) {
        setError("Hiba történt a regisztráció során!");
      } else {
        setError("Nem sikerült kapcsolódni a szerverhez!");
      }
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

  const textFieldStyle = {
    width: { xs: "90%", sm: "80%", md: "70%" },
    mb: 2,
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
      padding: { xs: "12px", sm: "14px" },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0F1827",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        minHeight: "100vh",
        padding: { xs: 1, sm: 2, md: 4 },
        paddingTop: { xs: 3, sm: 4 },
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Card
        sx={{
          color: "#d5d6d6",
          backgroundColor: "#202938",
          width: { xs: "95%", sm: "85%", md: "70%", lg: "60%" },
          height: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isSmallScreen && (
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              objectPosition: "center",
            }}
            image="/img/main/login_sample.png"
            alt="Registration sample"
          />
        )}

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            p: { xs: 0, sm: 3 },
            paddingBottom: { xs: 2, sm: 3 },
            paddingTop: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#d5d6d6",
              fontSize: { xs: "1.2rem", sm: "2rem" },
              textAlign: "center",
              mb: 3,
              fontWeight: 300,
            }}
          >
            Új munkaválláló regisztrációja
          </Typography>

          <TextField
            sx={textFieldStyle}
            required
            label="Felhasználónév"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            sx={textFieldStyle}
            required
            label="Keresztnév"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            sx={textFieldStyle}
            required
            label="Vezetéknév"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            sx={textFieldStyle}
            required
            label="Jelszó"
            type="password"
            autoComplete="new-password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControl sx={{ ...textFieldStyle, mt: 1 }}>
            <InputLabel>Munkakör</InputLabel>
            <Select
              required
              value={role}
              label="Munkakör"
              onChange={(event: SelectChangeEvent) =>
                setRole(event.target.value)
              }
              sx={{
                "& .MuiSelect-icon": {
                  color: "#d5d6d6",
                },
              }}
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
              width: { xs: "90%", sm: "80%", md: "70%" },
              backgroundColor: "#BFA181",
              py: { xs: 1.5, sm: 2 },
              mt: 2,
              mb: 2,
              "&.Mui-disabled": {
                backgroundColor: "#9e9386",
                color: "#d5d6d6",
              },
              "&:hover": {
                backgroundColor: "#8B7355",
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
            open={openSuccessSnackbar}
            autoHideDuration={6000}
            onClose={() => {
              setOpenSuccessSnackbar(false);
              window.location.reload();
            }}
          >
            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
              Sikeres regisztráció!
            </Alert>
          </Snackbar>

          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => {
              setError(null);
              window.location.href = "/";
            }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegistrationCard;
