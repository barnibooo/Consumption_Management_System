import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Avatar,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface Customer {
  name: string;
  createdAt: string;
  createdBy: string;
  tickets: string[];
  admissions: string[];
}

function App() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monogram, setMonogram] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>("");

  useEffect(() => {
    const storedMonogram = localStorage.getItem("monogram");
    setMonogram(storedMonogram);
  }, []);

  const fetchCustomerData = () => {
    setLoading(true);
    axios
      .get(`https://localhost:5000/api/Customers/${customerId}`)
      .then((response) => {
        console.log(response.data);
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{
            width: "30%",
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
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <IconButton
          sx={{
            fontSize: 40,
            color: "#d5d6d6",
            "&:hover": {
              color: "#BFA181",
            },
            "&:active": {
              color: "#BFA181",
            },
          }}
          aria-label="add to shopping cart"
          onClick={fetchCustomerData}
        >
          <SearchOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <ThemeProvider theme={darkTheme}>
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
            marginTop: 2, // Add margin to the top
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: "#BFA181", color: "#d5d6d6" }}
                aria-label="recipe"
              >
                {monogram}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={customer?.name}
            subheader={"Személyes adatok"}
          />
          <CardMedia
            component="img"
            height="194"
            image="/img/profile/profile_temp.png"
          />
          <CardContent>
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
            />
            dfs
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
              gfhfgh
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </ThemeProvider>
    </Box>
  );
}

export default App;
