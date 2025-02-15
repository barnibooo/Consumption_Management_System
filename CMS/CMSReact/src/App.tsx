import React from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
} from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection={{ xs: "column", md: "row" }}
    >
      {/* Sidebar Replacement */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "grey.100",
          p: 2,
          width: { xs: "100%", md: "auto" },
          minWidth: { md: 100 },
          mb: { xs: 2, md: 0 },
          m: 2,
          height: "75%", // Set height to 100%
        }}
      >
        <Stack direction={{ xs: "row", md: "column" }} spacing={2}>
          <Button variant="contained">X</Button>
          <Button variant="contained">X</Button>
          <Button variant="contained">X</Button>
          <Button variant="contained">X</Button>
        </Stack>
      </Box>

      {/* Orders Section */}
      <Box
        mb={{ xs: 2, md: 3 }}
        width={{ xs: "100%", md: "auto" }}
        display="flex"
        justifyContent={{ xs: "center", md: "flex-start" }}
        sx={{ m: 2, height: "75%" }} // Add margin around the Orders Box and set height to 100%
      >
        <Card
          sx={{
            width: { xs: "100%", sm: 400, md: "auto", minWidth: 350 },
            height: "100%", // Set height to 100%
          }}
        >
          <CardContent>
            <Typography variant="h6">ORDERS</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              TOTAL: 9999xx
            </Typography>
            {[...Array(5)].map((_, index) => (
              <Typography key={index} variant="body2">
                1x Quod Enchiridion - 100xx
              </Typography>
            ))}
            <TextField
              label="Customer Id"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
            />
          </CardContent>
        </Card>
      </Box>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        ml={{ md: 3 }}
        width="100%"
      >
        {/* Content Cards */}
        <Box sx={{ height: "100%", overflowY: "scroll" }}>
          <Typography variant="h6" gutterBottom>
            Opus igitur est dicere possit dura
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            {[...Array(50)].map((_, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 250,
                  flex: { xs: "1 1 45%", sm: "1 1 30%" }, // Adjust flex property for xs and sm breakpoints
                  maxWidth: { xs: "100%", sm: "45%", md: "30%" },
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    bedfsdf
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
