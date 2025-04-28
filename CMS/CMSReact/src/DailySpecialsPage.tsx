import { useState, useEffect } from "react";
import {
  Alert,
  Snackbar,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import NoFoodOutlinedIcon from "@mui/icons-material/NoFoodOutlined";
import axios from "axios";
import { checkToken } from "./AuthService";
import { parseJwt } from "./JWTParser";
import { refreshToken } from "./RefreshService";

// Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
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

function DailySpecials() {
  // State Management
  const [levesOptions, setLevesOptions] = useState<string[]>([]);
  const [EloetelOptions, setEloetelOptions] = useState<string[]>([]);
  const [foetelOptions, setFoetelOptions] = useState<string[]>([]);
  const [hamburgerOptions, setHamburgerOptions] = useState<string[]>([]);
  const [pizzaOptions, setPizzaOptions] = useState<string[]>([]);
  const [desszertOptions, setDesszertOptions] = useState<string[]>([]);
  const [italOptions, setItalOptions] = useState<string[]>([]);
  const [kaveOptions, setKaveOptions] = useState<string[]>([]);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foodSelections, setFoodSelections] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  // Authentication & Token Validation
  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsUnauthorized(true);
        return;
      }

      try {
        const decodedToken = parseJwt(token);
        if (!decodedToken || decodedToken.role !== "Admin") {
          setIsUnauthorized(true);
          return;
        }

        const isValidToken = await checkToken();
        if (!isValidToken) {
          setIsUnauthorized(true);
          return;
        }

        await refreshToken();
      } catch (error) {
        setIsUnauthorized(true);
        setIsLoading(false);
      }
    };

    validateAndFetchData();
  }, []);

  if (isUnauthorized) {
    localStorage.setItem("isUnauthorizedRedirect", "true");
    window.location.href = "/";
    return null;
  }

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get(
          "https://localhost:5000/api/MenuItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const levesItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Leves" && item.isAvailable === true
        );
        setLevesOptions(levesItems.map((item: { name: string }) => item.name));

        const EloetelItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Előétel" && item.isAvailable === true
        );
        setEloetelOptions(
          EloetelItems.map((item: { name: string }) => item.name)
        );

        const foetelItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Főétel" && item.isAvailable === true
        );
        setFoetelOptions(
          foetelItems.map((item: { name: string }) => item.name)
        );

        const hamburgerItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Hamburger" && item.isAvailable === true
        );
        setHamburgerOptions(
          hamburgerItems.map((item: { name: string }) => item.name)
        );

        const pizzaItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Pizza" && item.isAvailable === true
        );
        setPizzaOptions(pizzaItems.map((item: { name: string }) => item.name));

        const desszertItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Desszert" && item.isAvailable === true
        );
        setDesszertOptions(
          desszertItems.map((item: { name: string }) => item.name)
        );

        const italItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Ital" && item.isAvailable === true
        );
        setItalOptions(italItems.map((item: { name: string }) => item.name));

        const kaveItems = response.data.filter(
          (item: { category: string; isAvailable: boolean }) =>
            item.category === "Kávé" && item.isAvailable === true
        );
        setKaveOptions(kaveItems.map((item: { name: string }) => item.name));
      } catch (error) {
        setError("Hiba történt az adatok betöltése közben!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Event Handlers
  const handleFoodChange = (index: number) => (event: any) => {
    const newSelections = [...foodSelections];
    newSelections[index] = event.target.value as string;
    setFoodSelections(newSelections);
  };

  // Conditional Renders
  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={120} sx={{ color: "#bfa181" }} />
      </Box>
    );
  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => {
            setError(null);
            window.location.href = "/";
          }}
        >
          <Alert
            onClose={() => {
              setError(null);
              window.location.href = "/";
            }}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Hiba történt az adatok betöltése közben!
          </Alert>
        </Snackbar>
      </Box>
    );

  // Main Component Render
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ padding: 4 }}>
          {/* Page Title */}
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ marginBottom: 4, fontWeight: 400 }}
          >
            Napi Ajánlat Kezelő
          </Typography>

          {/* Food Selection Forms */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Soup Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Leves
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-0"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Leves választása
                </InputLabel>
                <Select
                  labelId="food-select-label-0"
                  id="food-select-0"
                  value={foodSelections[0] || ""}
                  label="Leves választása"
                  onChange={handleFoodChange(0)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {levesOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Appetizer Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Előétel
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-1"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Előétel választása
                </InputLabel>
                <Select
                  labelId="food-select-label-1"
                  id="food-select-1"
                  value={foodSelections[1] || ""}
                  label="Előétel választása"
                  onChange={handleFoodChange(1)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {EloetelOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Main Course Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Főétel
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-2"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Főétel választása
                </InputLabel>
                <Select
                  labelId="food-select-label-2"
                  id="food-select-2"
                  value={foodSelections[2] || ""}
                  label="Főétel választása"
                  onChange={handleFoodChange(2)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {foetelOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Hamburger Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Hamburger
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-3"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Hamburger választása
                </InputLabel>
                <Select
                  labelId="food-select-label-3"
                  id="food-select-3"
                  value={foodSelections[3] || ""}
                  label="Hamburger választása"
                  onChange={handleFoodChange(3)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {hamburgerOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Pizza Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Pizza
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-4"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Pizza választása
                </InputLabel>
                <Select
                  labelId="food-select-label-4"
                  id="food-select-4"
                  value={foodSelections[4] || ""}
                  label="Pizza választása"
                  onChange={handleFoodChange(4)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {pizzaOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Dessert Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Desszert
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-5"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Desszert választása
                </InputLabel>
                <Select
                  labelId="food-select-label-5"
                  id="food-select-5"
                  value={foodSelections[5] || ""}
                  label="Desszert választása"
                  onChange={handleFoodChange(5)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {desszertOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Drink Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Ital
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-6"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Ital választása
                </InputLabel>
                <Select
                  labelId="food-select-label-6"
                  id="food-select-6"
                  value={foodSelections[6] || ""}
                  label="Ital választása"
                  onChange={handleFoodChange(6)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {italOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Coffee Selection */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                marginBottom: 2,
                marginRight: { xs: 0, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                textAlign="left"
                fontWeight={350}
                marginBottom={2}
              >
                Kávé
              </Typography>
              <FormControl fullWidth required>
                <InputLabel
                  id="food-select-label-7"
                  sx={{
                    color: "#d5d6d6",
                    "&.Mui-focused": {
                      color: "#bfa181",
                    },
                  }}
                >
                  Kávé választása
                </InputLabel>
                <Select
                  labelId="food-select-label-7"
                  id="food-select-7"
                  value={foodSelections[7] || ""}
                  label="Kávé választása"
                  onChange={handleFoodChange(7)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#0f1827",
                        "& .MuiMenuItem-root": {
                          color: "#d5d6d6",
                          "&.Mui-selected": {
                            backgroundColor: "#1a2738",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#1a2738",
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    color: "#d5d6d6",
                    backgroundColor: "#0f1827",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d5d6d6",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bfa181",
                    },
                    "& .MuiSelect-icon": {
                      color: "#d5d6d6",
                    },
                  }}
                >
                  {kaveOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Submit Button */}
          <Box sx={{ marginTop: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              sx={{
                m: 2,
                backgroundColor: "#BFA181",
                width: { xs: "80%", md: "30%", lg: "20%" },
                color: "#d5d6d6",
                "&.Mui-disabled": {
                  backgroundColor: "#9e9386",
                  color: "#d5d6d6",
                },
              }}
              onClick={async () => {
                const payload = {
                  soupName: foodSelections[0],
                  appetizerName: foodSelections[1],
                  mainCourseName: foodSelections[2],
                  hamburgerName: foodSelections[3],
                  pizzaName: foodSelections[4],
                  dessertName: foodSelections[5],
                  drinkName: foodSelections[6],
                  coffeeName: foodSelections[7],
                };

                try {
                  await axios.delete(
                    "https://localhost:5000/api/DailySpecials",
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  await axios.post(
                    "https://localhost:5000/api/DailySpecials",
                    payload,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  setFoodSelections(["", "", "", "", "", "", "", ""]);

                  setSuccessSnackbarOpen(true);
                } catch (error: any) {
                  if (error.response) {
                    switch (error.response.status) {
                      case 500:
                        setError("Szerver hiba történt!");
                        break;
                      default:
                        setError(
                          "Hiba történt a napi ajánlat frissítése közben!"
                        );
                    }
                  } else {
                    setError("Nem sikerült kapcsolódni a szerverhez!");
                  }
                  setSuccessSnackbarOpen(false);
                }
              }}
              disabled={foodSelections.some((selection) => selection === "")}
            >
              Napi ajánlat módosítása
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<NoFoodOutlinedIcon />}
              sx={{
                m: 2,
                backgroundColor: "#BFA181",
                width: { xs: "80%", md: "30%", lg: "20%" },
                color: "#d5d6d6",
                "&.Mui-disabled": {
                  backgroundColor: "#9e9386",
                  color: "#d5d6d6",
                },
              }}
              onClick={async () => {
                try {
                  await axios.delete(
                    "https://localhost:5000/api/DailySpecials",
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  setFoodSelections(["", "", "", "", "", "", "", ""]);

                  setSuccessSnackbarOpen(true);
                } catch (error: any) {
                  if (error.response) {
                    switch (error.response.status) {
                      case 500:
                        setError("Szerver hiba történt!");
                        break;
                      default:
                        setError(
                          "Hiba történt a napi ajánlat frissítése közben!"
                        );
                    }
                  } else {
                    setError("Nem sikerült kapcsolódni a szerverhez!");
                  }
                  setSuccessSnackbarOpen(false);
                }
              }}
            >
              Napi ajánlat törlése
            </Button>
          </Box>
        </Box>
      </ThemeProvider>

      {/* Notifications */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          window.location.href = "/";
        }}
      >
        <Alert
          onClose={() => {
            setError(null);
            window.location.href = "/";
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => {
          setSuccessSnackbarOpen(false);
          window.location.reload();
        }}
      >
        <Alert
          onClose={() => {
            setSuccessSnackbarOpen(false);
            window.location.reload();
          }}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              color: "#d5d6d6",
            },
          }}
        >
          Sikeres napi ajánlat frissítés!
        </Alert>
      </Snackbar>
    </>
  );
}

export default DailySpecials;
