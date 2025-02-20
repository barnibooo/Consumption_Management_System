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
  Leves: <RamenDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Előétel: <BakeryDiningOutlinedIcon sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Főétel: <DinnerDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Hamburger: <LunchDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Pizza: <LocalPizzaOutlinedIcon sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Desszert: <CookieOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Menü: <FastfoodOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Ital: <LocalBarOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />,
  Kávé: (
    <EmojiFoodBeverageOutlinedIcon sx={{ fontSize: 35, color: "#e7e6dd" }} />
  ),
  Egyéb: <MoreHorizIcon sx={{ fontSize: 35, color: "#e7e6dd" }} />,
};

const Dashboard: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Menü elemek típusa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orders, setOrders] = useState<MenuItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

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
        .filter((orderItem) => orderItem.quantity > 0); // Ha 0, akkor törli az elemet
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
      .get("https://localhost:5000/api/MenuItems") // Cseréld ki az API végpontot!
      .then((response) => {
        console.log(response.data); // Naplózza a teljes választ, hogy lássuk, mi érkezik
        if (Array.isArray(response.data)) {
          // Ha az adat egy tömb
          setMenuItems(response.data); // A válasz tömböt közvetlenül beállítjuk
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

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p>Hiba történt: {error}</p>;

  var l = menuItems.length;

  // Az egyedi kategóriák meghatározása for ciklussal
  const getUniqueCategories = () => {
    const categories: string[] = []; // A kategóriákat tartalmazó tömb

    // Végigiterálunk az items tömbön és hozzáadjuk a kategóriákat a categories tömbhöz
    for (let i = 0; i < l; i++) {
      const category = menuItems[i].category;
      // Csak akkor adjuk hozzá a kategóriát, ha még nincs benne a categories tömbben
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
    return categories;
  };

  const uniqueCategories = getUniqueCategories();

  // Kategóriák elemeinek megszámlálása

  // Filter out the "Egyéb" category
  const filteredCategories = uniqueCategories.filter(
    (category) => category !== "Egyéb"
  );

  // Check if there are any items in the "Egyéb" category
  const hasEgyebItems = menuItems.some((item) => item.category === "Egyéb");

  // Filter menu items based on the selected category
  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#202938" }}>
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: {
                xs: "center",
                sm: "center",
                xl: "space-between",
              },
              padding: { xs: "0 16px", xl: "0 24px" },
            }}
          >
            <BarChartIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 35 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#e7e6dd",
                textDecoration: "none",
              }}
            >
              Consumption Management System
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "#d3d9d4" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon
                  sx={{
                    fontSize: 35,
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handlePageNavigation(page)}
                  >
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <BarChartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                textDecoration: "none",
                color: "#e7e6dd",
                textAlign: { xs: "center", sm: "center" },
                flexGrow: { xs: 1, sm: 1 },
              }}
            >
              Consumption Management System
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageNavigation(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ fontSize: 25, color: "#e7e6dd", bgcolor: "#6d737d" }}
                  >
                    N
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        display="flex"
        height="calc(100vh - 64px)" // Adjust height to account for AppBar height
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
            <IconButton onClick={() => handleCategoryClick(null)}>
              <AppsIcon sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
            {filteredCategories.map((category) => (
              <IconButton
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {categoryIcons[category]}
              </IconButton>
            ))}
            <IconButton
              onClick={() => handleCategoryClick("Egyéb")}
              disabled={!hasEgyebItems}
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
          sx={{ height: "80%", p: 2 }} // Add margin around the Orders Box and set height to 50vh
        >
          <Card
            sx={{
              width: {
                xs: "100%",
                md: "100%",
              },
              height: "100%", // Set height to 100%
              backgroundColor: "#202938",
              display: "flex",
              flexDirection: "column", // Fontos a helyes elrendezéshez
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
                          sx={{ fontSize: 35, color: "#e7e6dd" }}
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
              sx={{ m: 2 }}
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
                    color: "#e7e6dd",
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
                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() => handleAddToOrder(item)}
                      disabled={item.isAvailable === false}
                      sx={{
                        color:
                          item.isAvailable === false ? "#6d737d" : "#e7e6dd",
                      }}
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveFromOrder(item)}
                      disabled={item.isAvailable === false}
                      sx={{
                        color:
                          item.isAvailable === false ? "#6d737d" : "#e7e6dd",
                      }}
                    >
                      <RemoveCircleOutlineIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleCloseDialog();
            },
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
