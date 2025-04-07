import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { checkToken } from "./AuthService";
import { parseJwt } from "./JWTParser";
import { refreshToken } from "./RefreshService";

// Dark theme definiálása
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

function App() {
  const [levesOptions, setLevesOptions] = useState<string[]>([]);
  const [EloetelOptions, setEloetelOptions] = useState<string[]>([]);
  const [foetelOptions, setFoetelOptions] = useState<string[]>([]);
  const [hamburgerOptions, setHamburgerOptions] = useState<string[]>([]);
  const [pizzaOptions, setPizzaOptions] = useState<string[]>([]);
  const [desszertOptions, setDesszertOptions] = useState<string[]>([]);
  const [italOptions, setItalOptions] = useState<string[]>([]);
  const [kaveOptions, setKaveOptions] = useState<string[]>([]);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [foodSelections, setFoodSelections] = useState<string[]>([
    "", // Leves
    "", // Előétel
    "", // Főétel
    "", // Hamburger
    "", // Pizza
    "", // Desszert
    "", // Ital
    "", // Kávé
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        setIsUnauthorized(true);
        return;
      }

      try {
        // Add admin role check
        const decodedToken = parseJwt(token);
        if (!decodedToken || decodedToken.role !== "Admin") {
          console.error("Unauthorized access: Admin role required");
          setIsUnauthorized(true);
          return;
        }

        const isValidToken = await checkToken();
        if (!isValidToken) {
          console.error("Invalid token. Redirecting to login...");
          setIsUnauthorized(true);
          return;
        }

        setTokenValidated(true);
        await refreshToken();
        setTokenRefreshed(true);

        // ...existing fetch logic...
      } catch (error) {
        console.error("Error during token validation or data fetching:", error);
        setIsUnauthorized(true);
        setIsLoading(false);
      }
    };

    validateAndFetchData();
  }, []);

  // Add unauthorized redirect
  if (isUnauthorized) {
    localStorage.setItem("isUnauthorizedRedirect", "true");
    window.location.href = "/";
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
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
          (item: { category: string }) => item.category === "Leves"
        );
        setLevesOptions(levesItems.map((item: { name: string }) => item.name));

        const EloetelItems = response.data.filter(
          (item: { category: string }) => item.category === "Előétel"
        );
        setEloetelOptions(
          EloetelItems.map((item: { name: string }) => item.name)
        );

        const foetelItems = response.data.filter(
          (item: { category: string }) => item.category === "Főétel"
        );
        setFoetelOptions(
          foetelItems.map((item: { name: string }) => item.name)
        );

        const hamburgerItems = response.data.filter(
          (item: { category: string }) => item.category === "Hamburger"
        );
        setHamburgerOptions(
          hamburgerItems.map((item: { name: string }) => item.name)
        );

        const pizzaItems = response.data.filter(
          (item: { category: string }) => item.category === "Pizza"
        );
        setPizzaOptions(pizzaItems.map((item: { name: string }) => item.name));

        const desszertItems = response.data.filter(
          (item: { category: string }) => item.category === "Desszert"
        );
        setDesszertOptions(
          desszertItems.map((item: { name: string }) => item.name)
        );

        const italItems = response.data.filter(
          (item: { category: string }) => item.category === "Ital"
        );
        setItalOptions(italItems.map((item: { name: string }) => item.name));

        const kaveItems = response.data.filter(
          (item: { category: string }) => item.category === "Kávé"
        );
        setKaveOptions(kaveItems.map((item: { name: string }) => item.name));
      } catch (error) {
        console.error("Error during data fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFoodChange = (index: number) => (event: any) => {
    const newSelections = [...foodSelections];
    newSelections[index] = event.target.value as string;
    setFoodSelections(newSelections);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ marginBottom: 4, fontWeight: 400 }}
        >
          Napi Ajánlat Kezelő
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Leves */}
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
            <FormControl fullWidth>
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

          {/* Előétel */}
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
            <FormControl fullWidth>
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

          {/* Főétel */}
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
            <FormControl fullWidth>
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

          {/* Hamburger */}
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
            <FormControl fullWidth>
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

          {/* Pizza */}
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
            <FormControl fullWidth>
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

          {/* Desszert */}
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
            <FormControl fullWidth>
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

          {/* Ital */}
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
            <FormControl fullWidth>
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

          {/* Kávé */}
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
            <FormControl fullWidth>
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

        {/* Buttons */}
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
                // Perform DELETE request
                await axios.delete("https://localhost:5000/api/DailySpecials", {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });

                // Perform POST request
                await axios.post(
                  "https://localhost:5000/api/DailySpecials",
                  payload,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                // Clear all selections
                setFoodSelections(["", "", "", "", "", "", "", ""]);

                // Show success message
                setSuccessSnackbarOpen(true);
              } catch (error) {
                console.error("Error during DELETE or POST request:", error);
              }
            }}
            disabled={foodSelections.some((selection) => selection === "")} // Disable if any selection is empty
          >
            Kész
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "#d5d6d6" }}
          onClose={() => setSuccessSnackbarOpen(false)}
        >
          A napi menü sikeresen frissítve!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
