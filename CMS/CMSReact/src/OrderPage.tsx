import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  MenuItem,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  CircularProgress,
  Alert,
  TextField,
  Snackbar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RamenDiningOutlined from "@mui/icons-material/RamenDiningOutlined";
import {
  CookieOutlined,
  DinnerDiningOutlined,
  FastfoodOutlined,
  LocalBarOutlined,
  LunchDiningOutlined,
} from "@mui/icons-material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { checkToken } from "./AuthService";
import { refreshToken } from "./RefreshService";
import { parseJwt } from "./JWTParser";

interface MenuItem {
  quantity: number;
  imagePath: string | undefined;
  itemId: number;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
}

const iconStyle = {
  fontSize: 35,
  color: "#d5d6d6",
  "&:hover": {
    color: "#BFA181",
  },
};

const categoryIcons: { [key: string]: React.ReactElement } = {
  Leves: <RamenDiningOutlined sx={iconStyle} />,
  Előétel: <BakeryDiningOutlinedIcon sx={iconStyle} />,
  Főétel: <DinnerDiningOutlined sx={iconStyle} />,
  Hamburger: <LunchDiningOutlined sx={iconStyle} />,
  Pizza: <LocalPizzaOutlinedIcon sx={iconStyle} />,
  Desszert: <CookieOutlined sx={iconStyle} />,
  Menü: <FastfoodOutlined sx={iconStyle} />,
  Ital: <LocalBarOutlined sx={iconStyle} />,
  Kávé: <EmojiFoodBeverageOutlinedIcon sx={iconStyle} />,
  Egyéb: <MoreHorizIcon sx={iconStyle} />,
  "Napi ajánlat": <CalendarTodayOutlinedIcon sx={iconStyle} />,
};

const Dashboard: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orders, setOrders] = useState<MenuItem[]>([]);
  const [dataLoadError, setDataLoadError] = useState<string | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);
  const [dailySpecials, setDailySpecials] = useState<any | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    if (category === "Napi ajánlat") {
      axios
        .get("https://localhost:5000/api/DailySpecials", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        .then((response) => {
          const specials = response.data;
          const filteredSpecials = menuItems.filter((item) =>
            [
              specials[0].soupName,
              specials[0].appetizerName,
              specials[0].mainCourseName,
              specials[0].hamburgerName,
              specials[0].pizzaName,
              specials[0].dessertName,
              specials[0].drinkName,
              specials[0].coffeeName,
            ].includes(item.name)
          );
          setDailySpecials(filteredSpecials);
        })
        .catch((error) => {
          console.error(
            "Hiba történt a napi ajánlatok betöltése közben:",
            error
          );
          setDailySpecials([]);
        });
    }
  };

  const handleAddToOrder = (item: MenuItem) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find(
        (orderItem) => orderItem.itemId === item.itemId
      );
      if (existingOrder) {
        return prevOrders.map((orderItem) =>
          orderItem.itemId === item.itemId
            ? { ...orderItem, quantity: (orderItem.quantity || 0) + 1 }
            : orderItem
        );
      } else {
        return [...prevOrders, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromOrder = (item: MenuItem) => {
    setOrders((prevOrders) => {
      return prevOrders
        .map((orderItem) =>
          orderItem.itemId === item.itemId
            ? { ...orderItem, quantity: (orderItem.quantity || 0) - 1 }
            : orderItem
        )
        .filter((orderItem) => orderItem.quantity > 0);
    });
  };

  const handleDeleteFromOrder = (item: MenuItem) => {
    setOrders((prevOrders) =>
      prevOrders.filter((orderItem) => orderItem.itemId !== item.itemId)
    );
  };

  const calculateTotalPrice = () => {
    return orders.reduce(
      (total, orderItem) => total + orderItem.price * orderItem.quantity,
      0
    );
  };

  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        setIsUnauthorized(true);
        return;
      }

      try {
        const decodedToken = parseJwt(token);
        if (
          !decodedToken ||
          (decodedToken.role !== "Admin" &&
            decodedToken.role !== "RestaurantAssistant")
        ) {
          console.error(
            "Unauthorized access: Admin or RestaurantAssistant role required"
          );
          setIsUnauthorized(true);
          return;
        }

        const isValidToken = await checkToken();
        if (!isValidToken) {
          console.error("Invalid token. Redirecting to login...");
          setIsUnauthorized(true);
          return;
        }

        await refreshToken();

        const newToken = localStorage.getItem("token");
        if (!newToken) {
          throw new Error("Token refresh failed");
        }

        const menuResponse = await axios.get(
          "https://localhost:5000/api/MenuItems",
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );

        if (Array.isArray(menuResponse.data)) {
          setMenuItems(menuResponse.data);
        }
        const dailySpecialsResponse = await axios.get(
          "https://localhost:5000/api/DailySpecials",
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );

        if (dailySpecialsResponse.data) {
          setDailySpecials(dailySpecialsResponse.data);
        }

        setIsUnauthorized(false);
        setLoading(false);
      } catch (error) {
        console.error("Error during token validation or data fetching:", error);
        setIsUnauthorized(true);
        setLoading(false);
      }
    };

    validateAndFetchData();
  }, []);

  // Handle unauthorized access
  if (isUnauthorized) {
    localStorage.setItem("isUnauthorizedRedirect", "true");
    window.location.href = "/";
    return null;
  }

  const handleSubmitOrder = () => {
    if (!cardId || orders.length === 0) {
      return;
    }

    axios
      .get("https://localhost:5000/api/Cards/GetCustomerIdByCardId/" + cardId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (!isNaN(response.data)) {
          const token = localStorage.getItem("token");
          let decodedToken: { EmployeeId: number } | null = null;
          if (token) {
            decodedToken = parseJwt(token);
          }
          const orderData = {
            customerId: response.data,
            employeeId: decodedToken?.EmployeeId || "",
            menuItems: orders.map((orderItem) => ({
              menuItemId: orderItem.itemId,
              quantity: orderItem.quantity,
            })),
          };

          axios
            .post("https://localhost:5000/api/Orders", orderData, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              console.log(response.data);
              if (response.status === 201) {
                setOrderSuccess(true);
                setOrders([]);
                setCardId("");
                setTimeout(() => {
                  setOrderSuccess(false);
                }, 6000);
              }
            })
            .catch((error) => {
              setDataLoadError(error);
            });
        } else {
          setErrorSnackbar(true);
          setCardId("");
          setTimeout(() => setErrorSnackbar(false), 6000);
        }
      })
      .catch((error) => {
        console.error("Hiba történt az adatok betöltése közben:", error);
        setDataLoadError(error);
      });
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

  if (dataLoadError)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Snackbar
          open={Boolean(dataLoadError)}
          autoHideDuration={6000}
          onClose={() => {
            setDataLoadError(null);
            window.location.href = "/";
          }}
        >
          <Alert
            onClose={() => {
              setDataLoadError(null);
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

  var l = menuItems.length;

  const getUniqueCategories = () => {
    const categories: string[] = [];

    for (let i = 0; i < l; i++) {
      const category = menuItems[i].category;
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
    return categories;
  };

  const uniqueCategories = getUniqueCategories();

  const filteredCategories = uniqueCategories.filter(
    (category) => category !== "Egyéb"
  );

  filteredCategories.unshift("Napi ajánlat"); // A "Napi ajánlat" kategória hozzáadása az elejére

  const hasEgyebItems = menuItems.some((item) => item.category === "Egyéb");

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  return (
    <>
      <Box
        display="flex"
        height="calc(100vh - 64px)"
        flexDirection={{ xs: "column", md: "row" }}
      >
        {/* Oldalsáv */}
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "flex" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "flex-start",
            p: 2,
            width: { xs: "90%", md: "auto" },
            minWidth: { md: 50 },
            mb: { xs: 2, md: 0 },
            m: 2,
            height: "90%",
            backgroundColor: "#202938",
          }}
        >
          <Stack direction={{ xs: "row", md: "column" }} spacing={2}>
            <IconButton onClick={() => handleCategoryClick(null)}>
              <AppsIcon
                sx={{
                  fontSize: 35,
                  color: "#d5d6d6",
                  "&:hover": {
                    color: "#BFA181",
                  },
                  "&:active": {
                    color: "#BFA181",
                  },
                }}
              />
            </IconButton>
            {filteredCategories.map((category) => (
              <IconButton
                key={category}
                onClick={() => handleCategoryClick(category)}
                sx={{ iconStyle }}
              >
                {categoryIcons[category]}
              </IconButton>
            ))}
            <IconButton
              onClick={() => handleCategoryClick("Egyéb")}
              disabled={!hasEgyebItems}
              sx={{
                fontSize: 35,
                color: "#d5d6d6",
                "&:hover": {
                  color: "#BFA181",
                },
                "&:active": {
                  color: "#BFA181",
                },
              }}
            >
              {categoryIcons["Egyéb"]}
            </IconButton>
          </Stack>
        </Box>

        {/* Rendelés szekció */}
        <Box
          mb={{ xs: 2, md: 3 }}
          width={{ xs: "90%", md: "70%", lg: "40%", xl: "30%" }}
          display="flex"
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ height: "93%", p: 2 }}
        >
          <Card
            sx={{
              width: {
                xs: "100%",
                md: "100%",
              },
              height: "100%",
              backgroundColor: "#202938",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Rendelés"
              subheader={
                <>
                  {`Összesen: ${calculateTotalPrice()} Ft`}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <TextField
                      required
                      id="card-id-input"
                      label="Kártyazonosító"
                      variant="standard"
                      value={cardId || ""}
                      onChange={(e) => setCardId(e.target.value)}
                      sx={{
                        width: "80%",
                        "& .MuiInputBase-root": {
                          color: "#d5d6d6",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#d5d6d6",
                          "&.Mui-focused": {
                            color: "#d5d6d6",
                          },
                        },
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#d5d6d6",
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#d5d6d6",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#d5d6d6",
                        },
                        "& .Mui-focused .MuiInputLabel-root": {
                          color: "#d5d6d6 !important",
                        },
                        "& .Mui-focused .MuiInput-underline:before": {
                          borderBottomColor: "#d5d6d6 !important",
                        },
                        "& .Mui-focused .MuiInput-underline:after": {
                          borderBottomColor: "#d5d6d6 !important",
                        },
                        marginTop: 2,
                      }}
                    />
                  </Box>
                </>
              }
              sx={{
                "& .MuiCardHeader-subheader": {
                  color: "#d5d6d6",
                },
                "& .MuiCardHeader-title": {
                  color: "#e7e6dd",
                },
              }}
            />
            {/* Görgethető lista konténer */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                maxHeight: "550px",
                padding: 1,
              }}
            >
              <List dense>
                {orders.map((orderItem, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteFromOrder(orderItem)}
                      >
                        <DeleteOutlineOutlinedIcon
                          sx={{
                            fontSize: 35,
                            color: "#d5d6d6",
                            "&:hover": {
                              color: "#BFA181",
                            },
                          }}
                        />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      {categoryIcons[orderItem.category]}
                    </ListItemAvatar>
                    <Typography variant="body2" color="#e7e6dd" fontSize={16}>
                      {orderItem.name} x{orderItem.quantity} <br />{" "}
                      {orderItem.price * orderItem.quantity} Ft
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            {/* Gomb a rendelés leadására */}
            <CardActions
              disableSpacing
              sx={{ mt: "auto", justifyContent: "center", paddingBottom: 2 }}
            >
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  m: 2,
                  backgroundColor: "#BFA181",
                  width: "80%",
                  "&.Mui-disabled": {
                    backgroundColor: "#9e9386",
                    color: "#d5d6d6",
                  },
                }}
                onClick={handleSubmitOrder}
                disabled={!cardId || orders.length === 0}
              >
                Rendelés leadása
              </Button>
              <Snackbar
                open={orderSuccess}
                autoHideDuration={6000}
                onClose={() => setOrderSuccess(false)}
              >
                <Alert
                  onClose={() => setOrderSuccess(false)}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  Sikeres rendelés leadás!
                </Alert>
              </Snackbar>
              <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                onClose={() => setErrorSnackbar(false)}
              >
                <Alert
                  onClose={() => setErrorSnackbar(false)}
                  severity="error"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  A megadott kártyaszám nem létezik!
                </Alert>
              </Snackbar>
            </CardActions>
          </Card>
        </Box>

        {/* Fő tartalom */}
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          ml={{ md: 3 }}
          width="100%"
        >
          {selectedCategory === "Napi ajánlat" ? (
            dailySpecials && dailySpecials.length > 0 ? (
              <Box sx={{ height: "100%", overflowY: "scroll" }}>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={2}
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                  margin={2}
                >
                  {dailySpecials.map((item: MenuItem) => (
                    <Card
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "45%",
                          md: "90%",
                          lg: "45%",
                          xl: "30%",
                        },
                        background: "#202938",
                        color: "#d5d6d6",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      key={item.itemId}
                    >
                      <CardHeader
                        title={item.name}
                        subheader={item.category}
                        sx={{
                          "& .MuiCardHeader-subheader": { color: "#d5d6d6" },
                        }}
                      />
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.imagePath}
                        alt="Kép"
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <Typography mb={2}>{item.description}</Typography>
                        <Box sx={{ mt: "auto" }}>
                          <Typography fontWeight="bold">
                            {item.isAvailable ? "Elérhető" : "Nem elérhető"}
                          </Typography>
                          <Typography fontWeight="bold">
                            {item.price} Ft
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions
                        disableSpacing
                        sx={{ mt: "auto", justifyContent: "flex-start" }}
                      >
                        <IconButton
                          onClick={() => handleAddToOrder(item)}
                          disabled={item.isAvailable === false}
                        >
                          <AddCircleOutlineIcon
                            sx={{
                              fontSize: 35,
                              color:
                                item.isAvailable === false
                                  ? "#6d737d"
                                  : "#d5d6d6",
                              "&:hover": {
                                color:
                                  item.isAvailable === false
                                    ? "#6d737d"
                                    : "#BFA181",
                              },
                            }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => handleRemoveFromOrder(item)}
                          disabled={item.isAvailable === false}
                        >
                          <RemoveCircleOutlineIcon
                            sx={{
                              fontSize: 35,
                              color:
                                item.isAvailable === false
                                  ? "#6d737d"
                                  : "#d5d6d6",
                              "&:hover": {
                                color:
                                  item.isAvailable === false
                                    ? "#6d737d"
                                    : "#BFA181",
                              },
                            }}
                          />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              </Box>
            ) : (
              <Typography variant="h6" color="#d5d6d6" textAlign="center">
                Nincs elérhető napi ajánlat.
              </Typography>
            )
          ) : (
            <Box sx={{ height: "100%", overflowY: "scroll" }}>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
                margin={2}
              >
                {filteredMenuItems.map((item) => (
                  <Card
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "45%",
                        md: "90%",
                        lg: "45%",
                        xl: "30%",
                      },
                      background: "#202938",
                      color: "#d5d6d6",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={item.itemId}
                  >
                    <CardHeader
                      title={item.name}
                      subheader={item.category}
                      sx={{
                        "& .MuiCardHeader-subheader": { color: "#d5d6d6" },
                      }}
                    />
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.imagePath}
                      alt="Kép"
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Typography mb={2}>{item.description}</Typography>
                      <Box sx={{ mt: "auto" }}>
                        <Typography fontWeight="bold">
                          {item.isAvailable ? "Elérhető" : "Nem elérhető"}
                        </Typography>
                        <Typography fontWeight="bold">
                          {item.price} Ft
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions
                      disableSpacing
                      sx={{ mt: "auto", justifyContent: "flex-start" }}
                    >
                      <IconButton
                        onClick={() => handleAddToOrder(item)}
                        disabled={item.isAvailable === false}
                      >
                        <AddCircleOutlineIcon
                          sx={{
                            fontSize: 35,
                            color:
                              item.isAvailable === false
                                ? "#6d737d"
                                : "#d5d6d6",
                            "&:hover": {
                              color:
                                item.isAvailable === false
                                  ? "#6d737d"
                                  : "#BFA181",
                            },
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemoveFromOrder(item)}
                        disabled={item.isAvailable === false}
                      >
                        <RemoveCircleOutlineIcon
                          sx={{
                            fontSize: 35,
                            color:
                              item.isAvailable === false
                                ? "#6d737d"
                                : "#d5d6d6",
                            "&:hover": {
                              color:
                                item.isAvailable === false
                                  ? "#6d737d"
                                  : "#BFA181",
                            },
                          }}
                        />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
