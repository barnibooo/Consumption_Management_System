import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

function MediaCard() {
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
            xs: "50%",
            md: "50%",
          },
          height: "60vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: { xl: "50%" },
            flex: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Login
          </Typography>
          <TextField
            sx={{
              width: {
                xs: "70%",
                md: "70%",
              },
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
              width: {
                xs: "70%",
                md: "70%",
              },
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
              width: {
                xs: "70%",
                md: "70%",
              },
              height: "Auto",
            }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </CardContent>
        <CardMedia
          sx={{
            width: { xl: "50%" },
            objectFit: "cover",
            objectPosition: "right",
          }}
          image="/img/gyik.jpg"
        />
      </Card>
    </Box>
  );
}

export default MediaCard;
