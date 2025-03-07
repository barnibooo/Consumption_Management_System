import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function RegistrationCard() {
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
        padding: 4,
        boxSizing: "border-box",
        overflowY: "auto",
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
        <CardMedia
          component="img"
          sx={{
            width: isSmallScreen ? "100%" : "50%",
            height: isSmallScreen ? "30%" : "auto",
            objectFit: "cover",
            objectPosition: "left",
          }}
          image="/img/main/login_sample.png"
          alt="Registration sample"
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
              mr: 2,
              display: { xs: "none", md: "flex" },
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
            variant="h4"
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          >
            Register
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 300,
              color: "#d5d6d6",
              textDecoration: "none",
              marginBottom: 2,
            }}
          >
            Create your account
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
            id="outlined-username"
            label="Username"
            type="text"
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
            id="outlined-firstname"
            label="First Name"
            type="text"
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
            id="outlined-lastname"
            label="Last Name"
            type="text"
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
            id="outlined-password"
            label="Password"
            type="password"
            autoComplete="new-password"
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
            id="outlined-role"
            label="Role"
            type="text"
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
            endIcon={<PersonAddIcon />}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegistrationCard;
