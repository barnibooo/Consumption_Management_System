import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  TextField,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { format } from "date-fns";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
import { parseJwt } from "./JWTParser";
import ReceiptPdfAssembled from "./ReceiptPdfAssembled";

// Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
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

// Helper Functions
const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return format(date, "yyyy-MM-dd HH:mm");
};

// Type Definitions
export interface ConsumptionItem {
  productName: string;
  description: string;
  orderDate: string;
  quantity: number;
  price: number;
}

interface CheckoutResponse {
  consumption: ConsumptionItem[];
  totalAmount: number;
}

interface Customer {
  customerId: number;
  cardId: string;
  name: string;
  createdAt: string;
  createdBy: number;
  isActive: boolean;
}

// Component Styles
const commonStyles = {
  textField: {
    width: { xs: "80%", sm: "50%", md: "30%" },
    height: "Auto",
    marginTop: { xs: 1, sm: 2 },
    marginBottom: { xs: 1, sm: 2 },
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
  },
  iconButton: {
    fontSize: { xs: 32, sm: 40 },
    color: "#d5d6d6",
    margin: { xs: 1, sm: 2 },
    "&.Mui-disabled": {
      color: "#6d737d !important",
    },
    "&:not(.Mui-disabled):hover": {
      color: "#BFA181",
    },
    "&:not(.Mui-disabled):active": {
      color: "#d5d6d6",
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#0F1827",
    padding: 0,
    overflowX: "hidden",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: { xs: 1, sm: 2 },
    width: "100%",
    overflowX: "hidden",
  },
  searchBox: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "row", sm: "row" },
    justifyContent: "center",
    alignItems: "center",
    gap: { xs: 1, sm: 2 },
    p: { xs: 1, sm: 2 },
    marginTop: { xs: 1, sm: 2 },
    overflowX: "hidden",
  },
  cardContainer: {
    width: { xs: "100%", sm: "85%", md: "70%", lg: "60%" },
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    overflowX: "hidden",
  },
};

function Checkout() {
  // State Management
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string>("");
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(
    null
  );
  const [tokenValidated, setTokenValidated] = useState(false);
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [sucessmessagestatus, setsucessmessagestatus] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  // Event Handlers
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: "timeout" | "clickaway" | "escapeKeyDown" | undefined
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setsucessmessagestatus(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  // Authentication & Token Management
  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
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

  // Layout Effect - Overflow Control
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  if (isUnauthorized) {
    localStorage.setItem("isUnauthorizedRedirect", "true");
    return setTimeout(() => {
      window.location.href = "/";
    }, 0);
  }

  // API Calls
  const fetchCustomerData = () => {
    setLoading(true);
    axios
      .get(`https://localhost:5000/api/Customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(
            "Az oldal használatához magasabb jogosultság szükséges vagy a kapcsolat megszakadt!"
          );
        } else if (error.response && error.response.status === 404) {
          setError("A megadott kártyaazonosító nem található!");
        } else if (error.response && error.response.status === 401) {
          setError(
            "Az oldal használatához magasabb jogosultság szükséges vagy a kapcsolat megszakadt!"
          );
        } else {
          setError(error.message);
        }
        setLoading(false);
      });
  };

  const fetchCheckoutData = () => {
    setLoading(true);
    axios
      .get(`https://localhost:5000/api/Checkout/${customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.message) {
          setCheckoutData({
            consumption: [],
            totalAmount: response.data.totalAmount,
          });
        } else {
          setCheckoutData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(
            "Az oldal használatához magasabb jogosultság szükséges vagy a kapcsolat megszakadt!"
          );
        } else if (error.response && error.response.status === 404) {
          setError("A megadott kártyaazonosító nem található!");
        } else if (error.response && error.response.status === 401) {
          setError(
            "Az oldal használatához magasabb jogosultság szükséges vagy a kapcsolat megszakadt!"
          );
        } else if (error.response && error.response.message === 500) {
          setError("Hiba történt az adatok betöltésekor!");
        } else {
          setError("Hiba történt az adatok betöltésekor!");
        }
        setLoading(false);
      });
  };

  const finalizeCustomer = () => {
    if (customer) {
      axios
        .put(
          `https://localhost:5000/api/Customers/resetcardid/${customerId}`,
          {
            isActive: false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setIsBoxVisible(false);
          setCustomer({ ...response.data, isActive: false });
          setsucessmessagestatus(true);
          setTimeout(() => {
            window.location.reload();
          }, 6000);
        })
        .catch(() => {
          alert("Hiba történt a kártyaazonosító visszaállításakor!");
        });
    }
  };

  // Conditional Renders
  if (loading) {
    return (
      <Box sx={commonStyles.mainContainer}>
        <Box sx={commonStyles.searchBox}>
          <TextField
            sx={commonStyles.textField}
            required
            label="Kártyaazonosító"
            type="text"
            margin="dense"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            disabled
          />
          <IconButton sx={commonStyles.iconButton} disabled>
            <SearchOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={80} sx={{ color: "#bfa181" }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={commonStyles.mainContainer}>
        <Box sx={commonStyles.searchBox}>
          <TextField
            sx={commonStyles.textField}
            required
            label="Kártyaazonosító"
            type="text"
            margin="dense"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <IconButton
            sx={commonStyles.iconButton}
            onClick={() => {
              fetchCustomerData();
              fetchCheckoutData();
            }}
            disabled={!customerId}
          >
            <SearchOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => {
            setError(null);
            window.location.reload();
          }}
          sx={{
            width: { xs: "90%", sm: "auto" },
            bottom: { xs: 16, sm: 24 },
            left: { xs: "50%", sm: 24 },
            transform: { xs: "translateX(-50%)", sm: "none" },
          }}
        >
          <Alert
            severity="error"
            variant="filled"
            sx={{
              width: "100%",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  // Main Component Render
  return (
    <Box sx={commonStyles.mainContainer}>
      {/* Search Section */}
      <Box sx={commonStyles.searchBox}>
        <TextField
          sx={commonStyles.textField}
          required
          label="Kártyaazonosító"
          type="text"
          margin="dense"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <IconButton
          sx={commonStyles.iconButton}
          onClick={() => {
            fetchCustomerData();
            fetchCheckoutData();
          }}
          disabled={!customerId}
        >
          <SearchOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={80} sx={{ color: "#bfa181" }} />
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => {
            setError(null);
            window.location.reload();
          }}
          sx={{
            width: { xs: "100%", sm: "auto" },
            bottom: { xs: 0, sm: 24 },
          }}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Customer Data Display */}
      {isBoxVisible && checkoutData && customer && (
        <ThemeProvider theme={darkTheme}>
          <Card
            sx={{
              bgcolor: "#202938",
              color: "#d5d6d6",
              width: { xs: "100%", sm: "85%", md: "70%", lg: "60%" },
              mx: "auto",
              mb: { xs: 2, sm: 3 },
              borderRadius: { xs: 1, sm: 2 },
              overflowX: "hidden",
            }}
          >
            {/* Customer Header */}
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
                  variant="h5"
                  sx={{
                    color: "#d5d6d6",
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  }}
                >
                  {customer.name} #{customer.customerId}
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
            {/* Customer Content */}
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              {/* Total Amount Section */}
              <Typography
                variant="h4"
                sx={{
                  color: "#d5d6d6",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  mb: { xs: 2, sm: 3 },
                  fontWeight: 400,
                }}
              >
                {checkoutData.totalAmount === 0
                  ? "Nem történt fogyasztás"
                  : `Összes fogyasztás: ${checkoutData.totalAmount} Ft`}
              </Typography>

              {/* Consumption List */}
              {checkoutData.consumption &&
                checkoutData.consumption.length > 0 && (
                  <Box
                    sx={{
                      maxHeight: { xs: "50vh", sm: "60vh" },
                      overflowY: "auto",
                      borderTop: "1px dashed #d5d6d6",
                      borderBottom: "1px dashed #d5d6d6",
                      py: { xs: 1, sm: 2 },
                    }}
                  >
                    {checkoutData.consumption.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          p: { xs: 1, sm: 2 },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                            mb: 1,
                          }}
                        >
                          {item.productName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            mb: 0.5,
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                          }}
                        >
                          Mennyiség: {item.quantity}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                          }}
                        >
                          Ár: {item.price} Ft
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            color: "#9e9e9e",
                          }}
                        >
                          Rendelés ideje: {formatDateTime(item.orderDate)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

              {/* PDF Generation Section */}
              <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                <ReceiptPdfAssembled
                  customer={customer}
                  checkoutData={checkoutData}
                  onFinalize={finalizeCustomer}
                />
              </Box>
            </CardContent>
          </Card>
        </ThemeProvider>
      )}

      {/* Success Message Display */}
      <Snackbar
        open={sucessmessagestatus}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{
          width: { xs: "90%", sm: "auto" },
          bottom: { xs: 16, sm: 24 },
          left: { xs: "50%", sm: 24 },
          transform: { xs: "translateX(-50%)", sm: "none" },
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            padding: { xs: "6px 12px", sm: "8px 16px" },
          }}
        >
          A vendég kijelentkeztetés sikeresen megtörtént!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Checkout;
