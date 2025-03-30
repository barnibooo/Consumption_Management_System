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
  Tooltip,
  Avatar,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material/styles";
import { parseJwt } from "./JWTParser";

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Profil") {
      window.location.href = "/profileEmployee";
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
    handleCloseNavMenu();
    if (page === "Főoldal") {
      window.location.href = "/";
    } else if (page === "Jegyértékesítés") {
      window.location.href = "/tickets";
    } else if (page === "Jegyellenőrzés") {
      window.location.href = "/ticketvalidation";
    } else if (page === "Éttermi rendelés") {
      window.location.href = "/restaurant";
    } else if (page === "Véglegesítés") {
      window.location.href = "/customercheckout";
    } else if (page === "Regisztráció") {
      window.location.href = "/registration";
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
    typography: {
      fontFamily: "Roboto, Arial, sans-serif", // Set Roboto as the default font
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
    { name: "Véglegesítés", roles: ["Admin", "TicketAssistant"] },
  ];

  const settings = ["Profil", "Kijelentkezés"];

  const menuStyles = {
    "& .MuiMenuItem-root": {
      color: "#d5d6d6",
      "&:hover": {
        backgroundColor: "#37404f",
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* Ensures the font and background are applied globally */}
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              padding: { xs: "0 16px", xl: "0 24px" },
            }}
          >
            {/* BarChart Icon for Navigation */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  marginRight: { xs: 0, md: 2 },
                  "&:hover": {
                    color: "#BFA181",
                  },
                }}
              >
                <MenuIcon sx={{ fontSize: 35 }} />
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
                        sx={{
                          textAlign: "center",
                          color: "#d5d6d6",
                          fontSize: "1.2rem",
                        }}
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            {/* Title and BarChartIcon in the Center */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <BarChartIcon
                sx={{
                  marginRight: 1,
                  color: "#d5d6d6",
                  fontSize: { xs: 24, md: 30 },
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontWeight: 700,
                  color: "#d5d6d6",
                  textDecoration: "none",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                {window.innerWidth >= 1200
                  ? "Consumption Management System"
                  : "CMS"}
              </Typography>
            </Box>

            {/* User Avatar on the Edge */}
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
                  "& .MuiMenuItem-root": {
                    color: "#d5d6d6", // Text color
                    "&:hover": {
                      backgroundColor: "#37404f", // Hover background color
                    },
                  },
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
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography
                      sx={{ textAlign: "center", fontSize: "1.2rem" }}
                    >
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
