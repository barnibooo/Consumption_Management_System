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
import CountdownTimer from "./CountdownTimer";

// Types
interface NavbarProps {
  role: string | null;
}

// Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f1827",
      paper: "#0f1827",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Navigation Configuration
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
  { name: "Napi ajánlat kezelő", roles: ["Admin"] },
  { name: "Véglegesítés", roles: ["Admin", "TicketAssistant"] },
];

const settings = ["Profil", "Kijelentkezés"];

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  // State Management
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [monogram, setMonogram] = useState<string | null>(null);

  // User Data Effect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken && parsedToken.Monogram) {
        setMonogram(parsedToken.Monogram);
      }
    }
  }, []);

  // Event Handlers
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
      window.location.href = "/employeeProfile";
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
        } catch (error) {}
      }
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  };

  const handlePageNavigation = (page: string) => {
    handleCloseNavMenu();
    if (page === "Főoldal") {
      window.location.href = "/";
    } else if (page === "Jegyértékesítés") {
      window.location.href = "/ticket";
    } else if (page === "Jegyellenőrzés") {
      window.location.href = "/ticketValidation";
    } else if (page === "Éttermi rendelés") {
      window.location.href = "/order";
    } else if (page === "Véglegesítés") {
      window.location.href = "/checkout";
    } else if (page === "Regisztráció") {
      window.location.href = "/registration";
    } else if (page === "Napi ajánlat kezelő") {
      window.location.href = "/dailyspecials";
    }
  };

  // Component Render
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position="static"
        sx={{
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 0.5, sm: 1 },
            overflowX: "hidden",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 48, sm: 56 },
              px: { xs: 0.5, sm: 1 },
            }}
          >
            {/* Navigation Menu Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  mr: { xs: 0.5, sm: 2 },
                  p: { xs: 1, sm: 1.5 },
                  "&:hover": { color: "#BFA181" },
                }}
              >
                <MenuIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
              </IconButton>

              {/* Navigation Menu */}
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
                  display: { xs: "block" },
                  "& .MuiPaper-root": {
                    width: { xs: "100%", sm: "auto" },
                    maxHeight: "80vh",
                    overflowY: "auto",
                    backgroundColor: "#202938",
                    mt: 1,
                  },
                }}
              >
                {pages
                  .filter((page) => page.roles.includes(role || ""))
                  .map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={() => handlePageNavigation(page.name)}
                      sx={{
                        py: { xs: 1.5, sm: 1 },
                        px: { xs: 2, sm: 2 },
                        "&:hover": { backgroundColor: "#37404f" },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#d5d6d6",
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>

            {/* Logo Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <BarChartIcon
                sx={{
                  mr: { xs: 0.5, sm: 1 },
                  color: "#d5d6d6",
                  fontSize: { xs: 22, sm: 24, md: 30 },
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
                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                  maxWidth: { xs: "120px", sm: "none" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    color: "#d5d6d6",
                  },
                }}
              >
                {window.innerWidth >= 600
                  ? "Consumption Management System"
                  : "CMS"}
              </Typography>
            </Box>

            {/* User Menu Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
              }}
            >
              {/* Timer Component */}
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  mr: { xs: 1, sm: 2 },
                }}
              >
                <CountdownTimer />
              </Box>

              {/* User Avatar & Menu */}
              <Tooltip title="Menü megnyitása">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: { xs: 0.5, sm: 1 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                      fontSize: { xs: 14, sm: 16 },
                      color: "#d5d6d6",
                      bgcolor: "#bfa181",
                    }}
                  >
                    {monogram}
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* User Settings Menu */}
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    width: { xs: "200px", sm: "auto" },
                  },
                  "& .MuiMenuItem-root": {
                    py: { xs: 1.5, sm: 1 },
                    color: "#d5d6d6",
                    "&:hover": {
                      backgroundColor: "#37404f",
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
