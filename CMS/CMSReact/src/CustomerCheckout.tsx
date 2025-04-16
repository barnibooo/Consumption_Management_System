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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return format(date, "yyyy-MM-dd HH:mm");
};

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

function App() {
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
        console.error("Hiba történt:", error);
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
        console.log(response.data);
        if (response.data.message) {
          // Ha nincs fogyasztás
          setCheckoutData({
            consumption: [],
            totalAmount: response.data.totalAmount,
          });
        } else {
          // Ha van fogyasztás
          setCheckoutData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
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

  const [isBoxVisible, setIsBoxVisible] = useState(true);

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
          setIsBoxVisible(false); // Immediately hide box
          setCustomer({ ...response.data, isActive: false });
          setsucessmessagestatus(true);
          setTimeout(() => {
            window.location.reload();
          }, 6000);
        })
        .catch((error) => {
          console.error("Error finalizing customer:", error);
          alert("Failed to finalize customer.");
        });
    }
  };

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

  // Modify the error return statement
  if (error)
    return (
      <>
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
              onClick={() => {
                fetchCustomerData();
                fetchCheckoutData();
              }}
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
          >
            <Alert
              onClose={() => {
                setError(null);
                window.location.reload();
              }}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </>
    );

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
          onClick={() => {
            fetchCustomerData();
            fetchCheckoutData();
          }}
        >
          <SearchOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>
      {isBoxVisible && checkoutData && customer && (
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
              padding: 2,
              fontFamily: "Courier New, monospace",
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
                  {customer.name} #{customer.customerId}
                </Typography>
              }
              subheader={
                <Typography variant="subtitle1" sx={{ color: "#d5d6d6" }}>
                  Adatok
                </Typography>
              }
            />
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  color: "#d5d6d6",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textIndent: "20px",
                  fontWeight: 400,
                  textAlign: "left",
                }}
              >
                {checkoutData.totalAmount === 0
                  ? "Nem történt fogyasztás"
                  : `Összes fogyasztás: ${checkoutData.totalAmount} Ft`}
              </Typography>
              {checkoutData.consumption &&
                checkoutData.consumption.length > 0 && (
                  <Box
                    sx={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      borderTop: "1px dashed #d5d6d6",
                      borderBottom: "1px dashed #d5d6d6",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    {checkoutData.consumption.map((item, index) => (
                      <Box key={index} sx={{ marginBottom: "10px" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#d5d6d6",
                            fontFamily: "Courier New, monospace",
                          }}
                        >
                          {item.productName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#d5d6d6",
                            fontFamily: "Courier New, monospace",
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#d5d6d6",
                            fontFamily: "Courier New, monospace",
                          }}
                        >
                          Mennyiség: {item.quantity}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#d5d6d6",
                            fontFamily: "Courier New, monospace",
                          }}
                        >
                          Ár: {item.price} Ft
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#d5d6d6",
                            fontFamily: "Courier New, monospace",
                          }}
                        >
                          Rendelés ideje: {formatDateTime(item.orderDate)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
            </CardContent>
            <ReceiptPdfAssembled
              customer={customer}
              checkoutData={checkoutData}
              onFinalize={finalizeCustomer}
            />
          </Card>
        </ThemeProvider>
      )}
      <Snackbar
        open={sucessmessagestatus}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          A vendég kijelentkeztetés sikeresen megtörtént!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
