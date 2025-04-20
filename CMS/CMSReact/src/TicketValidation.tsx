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
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { format } from "date-fns";
import { parseJwt } from "./JWTParser";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";

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
  const [customerId, setCustomerId] = useState<string>("");
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);
  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        window.location.href = "/login";
        return;
      }

      const decodedToken = parseJwt(token);
      if (
        !decodedToken ||
        (decodedToken.role !== "Admin" &&
          decodedToken.role !== "TicketAssistant")
      ) {
        setIsUnauthorized(true);
        return;
      }

      if (!tokenValidated) {
        const isValidToken = await checkToken();

        if (!isValidToken) {
          console.error("Invalid token. Redirecting to login...");
          window.location.href = "/login";
          return;
        }

        if (!tokenRefreshed) {
          await refreshToken();
          setTokenRefreshed(true);
        }

        setTokenValidated(true);
      }
    };

    validateAndFetchData();
  }, []);

  if (isUnauthorized) {
    localStorage.setItem("isUnauthorizedRedirect", "true");
    return setTimeout(() => {
      window.location.href = "/";
    }, 0);
  }

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
            Az oldal használatához magasabb jogosultság szükséges vagy a
            kapcsolat megszakadt!
          </Alert>
        </ThemeProvider>
      </Box>
    );

  if (loading)
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: { xs: 0, sm: 2 },
        paddingTop: { xs: 2, sm: 2 },
        paddingBottom: { xs: 2, sm: 2 },
        alignItems: "center",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "#0F1827",
        overflowX: "hidden",
      }}
    >
      {/* Search Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          p: { xs: 0, sm: 0 },
          overflowX: "hidden",
        }}
      >
        <TextField
          sx={{
            width: { xs: "90%", sm: "50%", md: "30%" },
            height: "Auto",
            marginTop: 0,
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
            marginBottom: { xs: 0, sm: 0 },
          }}
          required
          id="outlined-search"
          label="Kártyaazonosító"
          type="text"
          margin="dense"
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            setCustomer(null);
          }}
        />
        <IconButton
          sx={{
            fontSize: { xs: 32, sm: 40 },
            color: "#d5d6d6",
            "&.Mui-disabled": {
              color: "#6d737d !important", // Added !important to ensure override
            },
            "&:not(.Mui-disabled):hover": {
              color: "#BFA181",
            },
            "&:not(.Mui-disabled):active": {
              color: "#d5d6d6",
            },
          }}
          onClick={fetchCustomerData}
          disabled={!customerId}
        >
          <SearchOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {error && (
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
              if (error === "A megadott kártyaazonosító nem található!") {
                setError(null);
                window.location.reload();
              } else if (error === "Network Error") {
                setError(null);
                window.location.href = "/";
              }
            }}
          >
            <Alert
              onClose={() => {
                console.log(error);
                if (error === "A megadott kártyaazonosító nem található!") {
                  setError(null);
                  window.location.reload();
                } else if (error === "Network Error") {
                  setError(null);
                  window.location.href = "/";
                }
              }}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {error === "A megadott kártyaazonosító nem található!"
                ? "A megadott kártyaazonosító nem található!"
                : "Hiba történt az adatok betöltése közben!"}
            </Alert>
          </Snackbar>
        </Box>
      )}

      {/* Customer Card Section */}
      {customer && (
        <ThemeProvider theme={darkTheme}>
          <Card
            sx={{
              bgcolor: "#202938",
              color: "#d5d6d6",
              width: {
                xs: "95%",
                sm: "70%",
                md: "60%",
                lg: "50%",
                xl: "40%",
              },
              marginTop: { xs: 1, sm: 2 },
              borderRadius: { xs: 0, sm: 1 },
              overflowX: "hidden",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: "#BFA181",
                    color: "#d5d6d6",
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                  }}
                />
              }
              title={
                <Typography
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    fontWeight: 500,
                    color: "#d5d6d6",
                  }}
                >
                  {customer?.name} #{customer?.customerId}
                </Typography>
              }
              subheader={
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#d5d6d6",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  Adatok
                </Typography>
              }
            />
            <CardMedia
              component="img"
              sx={{
                height: { xs: 150, sm: 194 },
                objectFit: "cover",
              }}
              image="/img/profile/profile_temp.png"
            />
            <CardContent
              sx={{ padding: { xs: 1, sm: 2 }, overflowX: "hidden" }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "text.secondary",
                  marginY: { xs: 1, sm: 2 },
                  textIndent: { xs: 10, sm: 20 },
                  fontWeight: 400,
                  fontSize: { xs: "1.5rem", sm: "2rem" },
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
                sx={{
                  color: "text.secondary",
                  marginY: { xs: 1, sm: 2 },
                  textIndent: { xs: 10, sm: 20 },
                  fontWeight: 400,
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
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
