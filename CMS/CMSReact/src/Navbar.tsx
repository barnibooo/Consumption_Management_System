import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
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

function App() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
    if (page === "Főoldal") {
      window.location.href = "/";
    } else if (page === "Menü") {
      window.location.href = "/restaurant.html";
    } else if (page === "Jegyértékesítés") {
      window.location.href = "/tickets.html";
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

  const pages = ["Főoldal", "Menü", "Jegyértékesítés"];
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
              href=""
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
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handlePageNavigation(page)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#37404f",
                      },
                    }}
                  >
                    <Typography sx={{ textAlign: "center", color: "#d5d6d6" }}>
                      {page}
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
              href=""
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
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageNavigation(page)}
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
                    {page}
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
                      fontSize: 20,
                      color: "#d5d6d6",
                      bgcolor: "#bfa181",
                    }}
                  ></Avatar>
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
                    onClick={handleCloseUserMenu}
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
}

export default App;
