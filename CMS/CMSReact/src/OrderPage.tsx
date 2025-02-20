//TESTING
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

interface MenuItem {
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
    setOrders((prevOrders) => [...prevOrders, item]);
  };

  const handleRemoveFromOrder = (item: MenuItem) => {
    setOrders((prevOrders) => {
      const index = prevOrders.findIndex(
        (orderItem) => orderItem.itemId === item.itemId
      );
      if (index !== -1) {
        const newOrders = [...prevOrders];
        newOrders.splice(index, 1);
        return newOrders;
      }
      return prevOrders;
    });
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
  const countItemsInCategories = () => {
    const categoryCounts: { [key: string]: number } = {};
    menuItems.forEach((item) => {
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts[item.category] = 1;
      }
    });
    return categoryCounts;
  };

  const categoryCounts = countItemsInCategories();

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
            }}
          >
            <CardHeader
              title="Orders"
              subheader={`Total: ${orders.length}`}
              sx={{
                "& .MuiCardHeader-subheader": {
                  color: "#d5d6d6",
                },
                "& .MuiCardHeader-title": {
                  color: "#e7e6dd",
                },
              }}
            />
            <List dense>
              {orders.map((orderItem, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveFromOrder(orderItem)}
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
                    1x {orderItem.name}
                  </Typography>
                </ListItem>
              ))}
            </List>
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
                    image="/sample.png"
                    alt="Kép"
                  />
                  <CardContent>
                    <Typography>{item.description}</Typography>
                    <Typography>IsAvailable: {item.isAvailable ? "True" : "False"}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton onClick={() => handleAddToOrder(item)}>
                      <AddCircleOutlineIcon
                        sx={{ fontSize: 35, color: "#e7e6dd" }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveFromOrder(item)}>
                      <RemoveCircleOutlineIcon
                        sx={{ fontSize: 35, color: "#e7e6dd" }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;