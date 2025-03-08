import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import { Button, TextField, useMediaQuery, useTheme } from "@mui/material";

function MediaCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        backgroundColor: "#0F1827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          color: "#d5d6d6",
          backgroundColor: "#202938",
          width: {
            xs: "90%",
            sm: "70%",
            md: "55%",
            lg: "60%",
          },
          height: "auto",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        {!isSmallScreen && (
          <CardMedia
            component="img"
            sx={{
              width: "40%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "right",
            }}
            image="/img/main/login_sample.png"
            alt="Login sample"
          />
        )}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: isSmallScreen ? "100%" : "60%",
            flex: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 400,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          >
            Consumption Management System
          </Typography>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          >
            Üdvözöljük!
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          >
            Kérjük jelentkezz be!
          </Typography>
          <TextField
            sx={{
              width: "70%",
              height: "Auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d5d6d6",
                },
                "&:hover fieldset": {
                  borderColor: "#d5d6d6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#BFA181",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#d5d6d6",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#BFA181",
              },
              "& .MuiInputBase-input": {
                color: "#d5d6d6",
                caretColor: "#d5d6d6",
              },
              marginBottom: 2,
            }}
            required
            id="outlined-search"
            label="Felhasználónév"
            type="search"
            margin="dense"
          />
          <TextField
            sx={{
              width: "70%",
              height: "Auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d5d6d6",
                },
                "&:hover fieldset": {
                  borderColor: "#d5d6d6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#BFA181",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#d5d6d6",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#BFA181",
              },
              "& .MuiInputBase-input": {
                color: "#d5d6d6",
                caretColor: "#d5d6d6",
              },
              marginBottom: 2,
            }}
            required
            id="outlined-password-input"
            label="Jelszó"
            type="password"
            autoComplete="current-password"
            margin="dense"
          />
          <Button
            sx={{
              width: "70%",
              height: "Auto",
              backgroundColor: "#BFA181",
              marginBottom: 2,
            }}
            variant="contained"
            endIcon={<LoginIcon />}
          >
            Belépés
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MediaCard;
