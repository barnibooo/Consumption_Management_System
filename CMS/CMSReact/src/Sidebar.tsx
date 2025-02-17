import React from "react";
import { Stack, Box, IconButton } from "@mui/material";
import RamenDiningOutlined from "@mui/icons-material/RamenDiningOutlined";
import {
  CookieOutlined,
  DinnerDiningOutlined,
  FastfoodOutlined,
  LocalBarOutlined,
  LunchDiningOutlined,
} from "@mui/icons-material";

const Dashboard: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "flex-start",
          p: 2,
          width: { xs: "90%", md: "auto" },
          minWidth: { md: 50 },
          mb: { xs: 2, md: 0 },
          m: 2,
          height: "90%",
          backgroundColor: "#202938",
        }}
      >
        <Stack direction={{ xs: "row", md: "column" }} spacing={2}>
          <IconButton>
            <RamenDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
          </IconButton>
          <IconButton>
            <LunchDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
          </IconButton>
          <IconButton>
            <DinnerDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
          </IconButton>
          <IconButton>
            <CookieOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
          </IconButton>
          <IconButton>
            <FastfoodOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
          </IconButton>
          <IconButton>
            <LocalBarOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

export default Dashboard;
