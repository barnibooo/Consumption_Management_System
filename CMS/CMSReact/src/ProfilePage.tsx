import "./OrderPage.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Avatar,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Card
          sx={{
            bgcolor: "#202938",
            color: "#d5d6d6",
            width: {
              xs: "100%",
              sm: "90%",
              md: "70%",
              lg: "60%",
              xl: "50%",
            },
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "#BFA181" }} aria-label="recipe">
                N
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Customer Name"
            subheader="Subheader"
          />
          <CardMedia
            component="img"
            height="194"
            image="/img/landing/egyeb_temp.png"
            alt="Paella dish"
          />
          <CardContent>
            <Divider sx={{ fontFamily: "Arial" }}>Vezetéknév</Divider>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                marginTop: "10px",
                marginBottom: "10px",
                textIndent: "20px",
              }}
            >
              Minta Név
            </Typography>
            <Divider sx={{ fontFamily: "Arial" }}>Keresztnév</Divider>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                marginTop: "10px",
                marginBottom: "10px",
                textIndent: "20px",
              }}
            >
              Minta Név
            </Typography>
            <Divider sx={{ fontFamily: "Arial" }}>Felhasználónév</Divider>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                marginTop: "10px",
                marginBottom: "10px",
                textIndent: "20px",
              }}
            >
              Minta Név
            </Typography>
            <Divider sx={{ fontFamily: "Arial" }}>Beosztás</Divider>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                marginTop: "10px",
                marginBottom: "10px",
                textIndent: "20px",
              }}
            >
              Minta Név
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </ThemeProvider>
    </Box>
  );
}

export default App;
