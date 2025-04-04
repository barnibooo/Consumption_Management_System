import React, { useState, useEffect } from "react";
import {
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
import axios from "axios";

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
  const [foodSelections, setFoodSelections] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(true);

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
        <Typography variant="h4" textAlign="center" sx={{ marginBottom: 4 }}>
          Napi Menü
        </Typography>

        {/* Leves */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Leves</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-0">Leves választása</InputLabel>
            <Select
              labelId="food-select-label-0"
              id="food-select-0"
              value={foodSelections[0] || ""}
              label="Leves választása"
              onChange={handleFoodChange(0)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Előétel</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-1">Előétel választása</InputLabel>
            <Select
              labelId="food-select-label-1"
              id="food-select-1"
              value={foodSelections[1] || ""}
              label="Előétel választása"
              onChange={handleFoodChange(1)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Főétel</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-2">Főétel választása</InputLabel>
            <Select
              labelId="food-select-label-2"
              id="food-select-2"
              value={foodSelections[2] || ""}
              label="Főétel választása"
              onChange={handleFoodChange(2)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Hamburger</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-3">
              Hamburger választása
            </InputLabel>
            <Select
              labelId="food-select-label-3"
              id="food-select-3"
              value={foodSelections[3] || ""}
              label="Hamburger választása"
              onChange={handleFoodChange(3)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Pizza</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-4">Pizza választása</InputLabel>
            <Select
              labelId="food-select-label-4"
              id="food-select-4"
              value={foodSelections[4] || ""}
              label="Pizza választása"
              onChange={handleFoodChange(4)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Desszert</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-5">
              Desszert választása
            </InputLabel>
            <Select
              labelId="food-select-label-5"
              id="food-select-5"
              value={foodSelections[5] || ""}
              label="Desszert választása"
              onChange={handleFoodChange(5)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Ital</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-6">Ital választása</InputLabel>
            <Select
              labelId="food-select-label-6"
              id="food-select-6"
              value={foodSelections[6] || ""}
              label="Ital választása"
              onChange={handleFoodChange(6)}
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
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Kávé</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-7">Kávé választása</InputLabel>
            <Select
              labelId="food-select-label-7"
              id="food-select-7"
              value={foodSelections[7] || ""}
              label="Kávé választása"
              onChange={handleFoodChange(7)}
            >
              {kaveOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
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
              console.log("Payload:", payload);

              try {
                // Perform DELETE request
                console.log("Performing DELETE request...");
                await axios.delete("https://localhost:5000/api/DailySpecials", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                console.log("DELETE successful");

                // Perform POST request
                const response = await axios.post(
                  "https://localhost:5000/api/DailySpecials",
                  payload,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log("POST successful:", response.data);
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
    </ThemeProvider>
  );
}

export default App;
