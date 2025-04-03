import "./OrderPage.css";
import {
  ThemeProvider,
  createTheme,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
// import { checkToken } from "./AuthService";
// import { refreshToken } from "./RefreshService";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  // const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [levesOptions, setLevesOptions] = useState<string[]>([]);
  const [foodSelections, setFoodSelections] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      // Token validation logic is commented out to allow anyone access
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   console.error("No token found. Redirecting to login...");
      //   setIsUnauthorized(true);
      //   return;
      // }

      try {
        // const isValidToken = await checkToken(); // Implement your checkToken function
        // if (!isValidToken) {
        //   console.error("Invalid token. Redirecting to login...");
        //   setIsUnauthorized(true);
        //   return;
        // }

        setTokenValidated(true);
        // await refreshToken(); // Implement your refreshToken function
        setTokenRefreshed(true);

        // Fetch roles from API
        const response = await axios.get(
          "https://localhost:5000/api/Employees/roles"
        );
        setRoles(response.data);

        // Fetch "Leves" options
        const menuResponse = await axios.get(
          "https://localhost:5000/api/MenuItems"
        );
        const levesItems = menuResponse.data.filter(
          (item: { category: string }) => item.category === "leves"
        );
        setLevesOptions(levesItems.map((item: { name: string }) => item.name));

        setDataFetched(true);
        // setIsUnauthorized(false);
      } catch (error) {
        console.error("Error during data fetching:", error);
        // setIsUnauthorized(true);
      }
    };

    fetchData();
  }, []);

  // Validation removed to allow public access
  // if (isUnauthorized) {
  //   localStorage.setItem("isUnauthorizedRedirect", "true");
  //   setTimeout(() => {
  //     window.location.href = "/";
  //   }, 0);
  //   return null;
  // }

  // Handle Select Changes
  const handleFoodChange = (index: number) => (event: SelectChangeEvent) => {
    const newSelections = [...foodSelections];
    newSelections[index] = event.target.value as string;
    setFoodSelections(newSelections);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>; // Display loading indicator
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ padding: 4 }}>
        {/* Title */}
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
              value={foodSelections[0]}
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

        {/* Főétel */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Főétel</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-1">Főétel választása</InputLabel>
            <Select
              labelId="food-select-label-1"
              id="food-select-1"
              value={foodSelections[1]}
              label="Főétel választása"
              onChange={handleFoodChange(1)}
            >
              <MenuItem value="Főétel1">Főétel1</MenuItem>
              <MenuItem value="Főétel2">Főétel2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Hamburger */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Hamburger</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-2">
              Hamburger választása
            </InputLabel>
            <Select
              labelId="food-select-label-2"
              id="food-select-2"
              value={foodSelections[2]}
              label="Hamburger választása"
              onChange={handleFoodChange(2)}
            >
              <MenuItem value="Hamburger1">Hamburger1</MenuItem>
              <MenuItem value="Hamburger2">Hamburger2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Pizza */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Pizza</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-3">Pizza választása</InputLabel>
            <Select
              labelId="food-select-label-3"
              id="food-select-3"
              value={foodSelections[3]}
              label="Pizza választása"
              onChange={handleFoodChange(3)}
            >
              <MenuItem value="Pizza1">Pizza1</MenuItem>
              <MenuItem value="Pizza2">Pizza2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Desszert */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Desszert</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-4">
              Desszert választása
            </InputLabel>
            <Select
              labelId="food-select-label-4"
              id="food-select-4"
              value={foodSelections[4]}
              label="Desszert választása"
              onChange={handleFoodChange(4)}
            >
              <MenuItem value="Desszert1">Desszert1</MenuItem>
              <MenuItem value="Desszert2">Desszert2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Ital */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Ital</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-5">Ital választása</InputLabel>
            <Select
              labelId="food-select-label-5"
              id="food-select-5"
              value={foodSelections[5]}
              label="Ital választása"
              onChange={handleFoodChange(5)}
            >
              <MenuItem value="Ital1">Ital1</MenuItem>
              <MenuItem value="Ital2">Ital2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Kávé */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Kávé</Typography>
          <FormControl fullWidth>
            <InputLabel id="food-select-label-6">Kávé választása</InputLabel>
            <Select
              labelId="food-select-label-6"
              id="food-select-6"
              value={foodSelections[6]}
              label="Kávé választása"
              onChange={handleFoodChange(6)}
            >
              <MenuItem value="Kávé1">Kávé1</MenuItem>
              <MenuItem value="Kávé2">Kávé2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Új menü
          </Button>
          <Button variant="contained" color="secondary">
            Kész
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
