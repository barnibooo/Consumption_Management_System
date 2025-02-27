import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar } from "@mui/material";


import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material/styles";



function App() {
   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
        },
      });
      
    const pages = ["Home", "Menu"];
    const settings = ["Profile", "Account", "Dashboard", "Logout"];
  
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
                fontWeight: 400,
                textDecoration: "none",
                color: "#d5d6d6",
                textAlign: { xs: "center", sm: "center" },
                flexGrow: { xs: 1, sm: 1 },
                "&:hover": {
                  color: "#BFA181",
                },
              }}
            >
              Consumption Management System
            </Typography>
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
            <ThemeProvider theme={darkTheme}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        fontSize: 25,
                        color: "#d5d6d6",
                        bgcolor: "#bfa181",
                      }}
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
            </ThemeProvider>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default App;
