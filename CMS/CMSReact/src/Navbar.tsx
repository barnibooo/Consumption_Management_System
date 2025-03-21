import { useState, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material/styles";
import { parseJwt } from "./JWTParser"; // Import the parseJwt function

interface NavbarProps {
  role: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [monogram, setMonogram] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken && parsedToken.Monogram) {
        setMonogram(parsedToken.Monogram);
      }
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Profil") {
      window.location.href = "/profileEmployee.html";
    }
    if (setting === "Kijelentkezés") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.post(
            "https://localhost:5000/api/Auth/logout",
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.error("Logout failed", error);
        }
      }
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("monogram");
      window.location.href = "/login";
    }
  };

  const handlePageNavigation = (page: string) => {
    if (page === "Főoldal") {
      window.location.href = "/";
    } else if (page === "Jegyértékesítés") {
      window.location.href = "/tickets";
    } else if (page === "Jegyellenőrzés") {
      window.location.href = "/ticketvalidator";
    } else if (page === "Éttermi rendelés") {
      window.location.href = "/restaurant";
    } else if (page === "Vendég munkamenet zárása") {
      window.location.href = "/guestcheckout";
    } else if (page === "Regisztráció") {
      window.location.href = "/registration";
    } else {
      handleCloseNavMenu();
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0f1827",
        paper: "#0f1827",
      },
    },
  });

  const pages = [
    {
      name: "Főoldal",
      roles: ["Admin", "TicketAssistant", "RestaurantAssistant"],
    },
    { name: "Jegyértékesítés", roles: ["Admin", "TicketAssistant"] },
    {
      name: "Jegyellenőrzés",
      roles: ["Admin", "TicketAssistant", "RestaurantAssistant"],
    },
    { name: "Éttermi rendelés", roles: ["Admin", "RestaurantAssistant"] },
    { name: "Regisztráció", roles: ["Admin"] },
    { name: "Vendég munkamenet zárása", roles: ["Admin", "TicketAssistant"] },
  ];
  const settings = ["Profil", "Kijelentkezés"];

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
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
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontSize: 35,
                color: "#d5d6d6",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "#d5d6d6",
                textDecoration: "none",
              }}
            >
              Consumption Management System
            </Typography>

            {/* Mobile Menu Icon */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
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
                    "&:hover": {
                      color: "#BFA181",
                    },
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages
                  .filter((page) => page.roles.includes(role || ""))
                  .map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={() => handlePageNavigation(page.name)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#37404f",
                        },
                      }}
                    >
                      <Typography
                        sx={{ textAlign: "center", color: "#d5d6d6" }}
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            {/* Logo for Larger Screens */}
            <BarChartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontWeight: 700,
                textDecoration: "none",
                color: "#d5d6d6",
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              CMS
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages
                .filter((page) => page.roles.includes(role || ""))
                .map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => handlePageNavigation(page.name)}
                    sx={{
                      color: "#d5d6d6",
                      display: "block",
                      textTransform: "none",
                      fontSize: 20,
                      "&:hover": {
                        color: "#BFA181",
                      },
                    }}
                  >
                    <Typography variant="h2" sx={{ fontSize: "inherit" }}>
                      {page.name}
                    </Typography>
                  </Button>
                ))}
            </Box>

            {/* User Avatar and Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Menü megnyitása">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      fontSize: 18,
                      color: "#d5d6d6",
                      bgcolor: "#bfa181",
                    }}
                  >
                    {monogram}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                }}
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
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                    sx={{
                      color: "#d5d6d6",
                      "&:hover": {
                        backgroundColor: "#37404f",
                      },
                    }}
                  >
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
    </ThemeProvider>
  );
};

export default Navbar;
