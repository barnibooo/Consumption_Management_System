import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Alert,
  Button,
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

  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        setIsUnauthorized(true);
        window.location.href = "/login"; // Redirect to /login
        return;
      }

      const decodedToken = parseJwt(token);
      if (!decodedToken || decodedToken.role !== "Admin") {
        console.error("Access denied. Redirecting to login...");
        setIsUnauthorized(true);
        return;
      }

      try {
        const isValidToken = await checkToken();
        if (!isValidToken) {
          console.error("Invalid token. Redirecting to login...");
          setIsUnauthorized(true);
          window.location.href = "/login"; // Redirect to /login
          return;
        }

        setTokenValidated(true);
        await refreshToken();
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
      } catch (error) {
        console.error("Error during token validation or data fetching:", error);
        setIsUnauthorized(true);
      }
    };

    validateAndFetchData();
  }, []);

  if (isUnauthorized)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ThemeProvider theme={darkTheme}>
          <Alert severity="warning">
            Az oldal használatához magasabb jogosultság szükséges!
          </Alert>
        </ThemeProvider>
      </Box>
    );

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
          >
            Consumption Management System
          </Typography>
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
            Register
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
          >
            Create your account
          </Typography>
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
            label="Username"
            type="text"
            margin="dense"
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
            label="First Name"
            type="text"
            margin="dense"
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
            label="Last Name"
            type="text"
            margin="dense"
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
            label="Password"
            type="password"
            autoComplete="new-password"
            margin="dense"
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
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Role"
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
              width: "70%",
              height: "Auto",
              backgroundColor: "#BFA181",
              marginBottom: 2,
            }}
            variant="contained"
            endIcon={<PersonAddIcon />}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegistrationCard;
