import React, { useState, useEffect } from "react";
import { parseJwt } from "./JWTParser";
import { Typography, Box } from "@mui/material";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setTimeLeft(null);
        return;
      }

      const decodedToken = parseJwt(token);
      if (!decodedToken || !decodedToken.exp) {
        setTimeLeft(null);
        return;
      }

      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const remainingTime = expirationTime - currentTime;
      setTimeLeft(Math.max(remainingTime, 0));
    };

    checkToken();
    const interval = setInterval(checkToken, 1000);

    window.addEventListener("storage", checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
      <Typography
        variant="body2"
        sx={{
          color: timeLeft && timeLeft < 300000 ? "#ff4444" : "#d5d6d6",
          fontSize: "1rem",
          fontWeight: "300",
        }}
      >
        {timeLeft ? formatTime(timeLeft) : "00:00"}
      </Typography>
    </Box>
  );
};

export default CountdownTimer;
