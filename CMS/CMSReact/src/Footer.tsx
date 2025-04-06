import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

const Footer: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0f1827",
        paper: "#0f1827",
      },
      text: {
        primary: "#d5d6d6",
        secondary: "#bfa181",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  const pages = [
    { name: "Főoldal", link: "/" },
    { name: "Jegyértékesítés", link: "/tickets" },
    { name: "Jegyellenőrzés", link: "/ticketvalidation" },
    { name: "Éttermi rendelés", link: "/restaurant" },
    { name: "Regisztráció", link: "/registration" },
    { name: "Napi ajánlat kezelő", link: "/dailyspecials" },
    { name: "Véglegesítés", link: "/customercheckout" },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position="static"
        component="footer"
        sx={{
          backgroundColor: "#0f1827",
          padding: "10px 0",
          marginTop: "auto",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* CMS Title Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#d5d6d6",
                marginBottom: 1,
              }}
            >
              Consumption Management System
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
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
                sx={{
                  fontWeight: 400,
                  color: "#d5d6d6",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
              >
                CMS
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#d5d6d6",
                marginBottom: 1,
              }}
            >
              Navigáció
            </Typography>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                color: "#d5d6d6",
                "&:hover": { color: "#bfa181" },
              }}
            >
              Linkek
              <OpenInNewOutlinedIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleClose}
                  component="a"
                  href={page.link}
                  sx={{
                    color: "#d5d6d6",
                    "&:hover": { backgroundColor: "#37404f", color: "#bfa181" },
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Contact Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              flex: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#d5d6d6",
                marginBottom: 1,
              }}
            >
              Kapcsolat
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#d5d6d6", marginBottom: 1, fontSize: "1.0rem" }}
            >
              Dobosi Gábor
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#d5d6d6", marginBottom: 1, fontSize: "1.0rem" }}
            >
              Mák Luca
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#d5d6d6", marginBottom: 1, fontSize: "1.0rem" }}
            >
              Orbán Barnabás
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
