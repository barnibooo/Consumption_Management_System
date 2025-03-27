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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { format } from "date-fns";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
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
  const [monogram, setMonogram] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>("");
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  useEffect(() => {
    const validateAndFetchData = async () => {
      if (!tokenValidated) {
        const isValidToken = await checkToken();

        if (!isValidToken) {
          window.location.href = "/login";
          return;
        }
        if (isValidToken) {
          if (!tokenRefreshed) {
            await refreshToken();
            setTokenRefreshed(true);
          }
        }
      }

    };

    //validateAndFetchData();

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      console.log(decodedToken);
    }
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
        console.log(response.data);
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

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ThemeProvider theme={darkTheme}>
          <Alert severity="warning">{error}</Alert>
        </ThemeProvider>
      </Box>
    );
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
              marginTop: 2, // Add margin to the top
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
