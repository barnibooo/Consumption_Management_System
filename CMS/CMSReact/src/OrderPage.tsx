import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  CardHeader,
  CardMedia,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  CircularProgress,
  Alert,
  AlertTitle,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
import BarChartIcon from "@mui/icons-material/BarChart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmojiFoodBeverageOutlinedIcon from "@mui/icons-material/EmojiFoodBeverageOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

const pages = ["Home", "Menu"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const categoryIcons: { [key: string]: React.ReactElement } = {
  Leves: (
    <RamenDiningOutlined
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Előétel: (
    <BakeryDiningOutlinedIcon
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Főétel: (
    <DinnerDiningOutlined
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Hamburger: (
    <LunchDiningOutlined
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Pizza: (
    <LocalPizzaOutlinedIcon
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Desszert: (
    <CookieOutlined
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Menü: (
    <FastfoodOutlined
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Ital: (
    <LocalBarOutlined
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Kávé: (
    <EmojiFoodBeverageOutlinedIcon
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
  Egyéb: (
    <MoreHorizIcon
      sx={{
        fontSize: 35,
        color: "#d5d6d6",
        "&:hover": {
          color: "#BFA181",
        },
      }}
    />
  ),
};

const Dashboard: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orders, setOrders] = useState<MenuItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [finalizedOrders, setFinalizedOrders] = useState<
    { itemId: number; quantity: number }[]
  >([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageNavigation = (page: string) => {
    if (page === "Home") {
      window.location.href = "/index.html";
    } else if (page === "Menu") {
      window.location.href = "/restaurant.html";
    } else {
      handleCloseNavMenu();
    }
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
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

  useEffect(() => {
    axios
      .get("https://localhost:5000/api/MenuItems")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setMenuItems(response.data);
        } else {
          console.error("Hibás API válasz: nem tömb", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
  if (error)
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box width="40%">
            <Alert severity="error">
              <AlertTitle>Hiba</AlertTitle>
              Hiba történt az adatok betöltése közben!
            </Alert>
          </Box>
        </Box>
      </ThemeProvider>
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

  const hasEgyebItems = menuItems.some((item) => item.category === "Egyéb");

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitOrder = (cId: string) => {
    setGuestId(cId);

    const orderList = orders.map((orderItem) => ({
      itemId: orderItem.itemId,
      quantity: orderItem.quantity,
    }));

    setFinalizedOrders(orderList);

    axios
      .post("https://localhost:5000/api/Orders", {
        customerId: cId,
        employeeId: 1,
        menuItems: orders.map((orderItem) => ({
          menuItemId: orderItem.itemId,
          quantity: orderItem.quantity,
        })),
      })
      .then((response) => {
        console.log("Order submitted successfully:", response.data);
        setOrderId(response.data.orderId);
        setDialogOpen(true);
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        height="calc(100vh - 64px)"
        flexDirection={{ xs: "column", md: "row" }}
      >
        {/* Sidebar Replacement */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
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
            <IconButton
              onClick={() => handleCategoryClick(null)}
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
              <AppsIcon />
            </IconButton>
            {filteredCategories.map((category) => (
              <IconButton
                key={category}
                onClick={() => handleCategoryClick(category)}
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

        {/* Orders Section */}
        <Box
          mb={{ xs: 2, md: 3 }}
          width={{ xs: "90%", md: "70%", lg: "40%", xl: "30%" }}
          display="flex"
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ height: "80%", p: 2 }}
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
              title="Orders"
              subheader={`Total: ${calculateTotalPrice()} Ft`}
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
                      {orderItem.name} x{orderItem.quantity}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            {/* Gomb a rendelés leadására */}
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                m: 2,
                backgroundColor: "#BFA181",
              }}
              onClick={handleOpenDialog}
            >
              Rendelés leadása
            </Button>
          </Card>
        </Box>

        {/* Main Content */}
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          ml={{ md: 3 }}
          width="100%"
        >
          {/* Content Cards */}
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
                  <CardContent>
                    <Typography>{item.description}</Typography>
                    <Typography>
                      Rendelhető: {item.isAvailable ? "Igen" : "Nem"}
                    </Typography>
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
                            item.isAvailable === false ? "#6d737d" : "#d5d6d6",
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
                            item.isAvailable === false ? "#6d737d" : "#d5d6d6",
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
        </Box>
      </Box>
      <ThemeProvider theme={darkTheme}>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(
                  (formData as any).entries()
                );
                const id = formJson.id as string;
                handleSubmitOrder(id);
                handleCloseDialog();
              },
            },
          }}
        >
          <DialogTitle>Rendelés leadása</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Kérjük adja meg a vendég azonosítóját!
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="name"
              name="id"
              label="Azonosító"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Mégse</Button>
            <Button type="submit">Leadás</Button>
          </DialogActions>
        </Dialog>
        <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sikeres rendelés leadás"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography>A rendelés leadva!</Typography>
          <Typography>Rendelési szám: {orderId}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
        handleClose();
        window.location.reload();
      }} autoFocus>
            Rendben
          </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
