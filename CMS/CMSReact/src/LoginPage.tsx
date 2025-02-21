import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { Button, TextField, useMediaQuery, useTheme } from "@mui/material";

function MediaCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: {
            xs: "90%",
            sm: "70%",
            md: "55%",
            lg: "60%",
          },
          height: "70vh",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <CardMedia
          sx={{
            width: isSmallScreen ? "100%" : "50%",
            height: isSmallScreen ? "40%" : "100%",
            objectFit: "cover",
            objectPosition: "right",
          }}
          image="/img/gyik.jpg"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: isSmallScreen ? "100%" : "50%",
            flex: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Consumption Management System
          </Typography>
          <Typography gutterBottom variant="h2" component="div">
            Welcome
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Login to your account
          </Typography>
          <TextField
            sx={{
              width: "70%",
              height: "Auto",
            }}
            required
            id="outlined-search"
            label="Search field"
            type="search"
            margin="dense"
          />
          <br />
          <TextField
            sx={{
              width: "70%",
              height: "Auto",
            }}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
          />
          <br />
          <Button
            sx={{
              width: "70%",
              height: "Auto",
            }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MediaCard;
