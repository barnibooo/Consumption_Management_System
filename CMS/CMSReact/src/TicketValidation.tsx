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
  Alert,
  Snackbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { format } from "date-fns";
import { parseJwt } from "./JWTParser";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return format(date, "yyyy-MM-dd HH:mm");
};

interface Ticket {
  ticketId: number;
  ticketName: string;
}

interface Admission {
  admissionId: number;
  admissionName: string;
}

interface Customer {
  customerId: number;
  cardId: string;
  name: string;
  createdAt: string;
  createdBy: number;
  tickets: Ticket[];
  admissions: Admission[];
}

function App() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [customerId, setCustomerId] = useState<string>("");

  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = parseJwt(token);
      }
    };

    validateAndFetchData();
  }, []);

  const fetchCustomerData = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get(`https://localhost:5000/api/Customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("A megadott kártyaazonosító nem található!");
        } else if (error.response && error.response.status === 401) {
          setError("Az oldal használatához magasabb jogosultság szükséges!");
        } else {
          setError(error.message);
        }
        setLoading(false);
      });
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

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

  if (loading) {
    return <div>Loading...</div>;
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
          label="Kártyaazonosító"
          type="search"
          margin="dense"
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            setCustomer(null); // A Card eltüntetése minden keresésnél
          }}
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

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {customer && (
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
              marginTop: 2,
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: "#BFA181", color: "#d5d6d6" }}
                  aria-label="recipe"
                ></Avatar>
              }
              title={
                <Typography variant="h5" sx={{ color: "#d5d6d6" }}>
                  {customer?.name} #{customer?.customerId}
                </Typography>
              }
              subheader={
                <Typography variant="subtitle1" sx={{ color: "#d5d6d6" }}>
                  Adatok
                </Typography>
              }
            />
            <CardMedia
              component="img"
              height="194"
              image="/img/profile/profile_temp.png"
            />
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 400,
                  textAlign: "left",
                }}
              >
                {customer ? `Hello ${customer?.name}!` : ""}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 300,
                  textAlign: "left",
                }}
              >
                {customer
                  ? `Belépés ideje: ${formatDateTime(customer.createdAt)}`
                  : ""}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 300,
                  textAlign: "left",
                }}
              >
                {customer
                  ? customer.tickets.map((ticket) => (
                      <div key={ticket.ticketId}>Jegy: {ticket.ticketName}</div>
                    ))
                  : "N/A"}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 300,
                  textAlign: "left",
                }}
              >
                Kiegészítő jegy(ek):
                {customer
                  ? customer.admissions.map((admission) => (
                      <li key={admission.admissionId}>
                        {admission.admissionName}
                      </li>
                    ))
                  : "N/A"}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </ThemeProvider>
      )}
    </Box>
  );
}

export default App;
