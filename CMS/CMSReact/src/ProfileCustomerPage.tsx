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
  TextField,
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
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#202938",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: 2,
        }}
      >
        <TextField
          id="outlined-required"
          label="Dolgozó azonosító"
          sx={{
            "& .MuiInputBase-root": {
              color: "#d5d6d6",
            },
            "& .MuiFormLabel-root": {
              color: "#d5d6d6",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d5d6d6",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d5d6d6",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#d5d6d6",
              },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "#d5d6d6",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
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
    </Box>
  );
}

export default App;
