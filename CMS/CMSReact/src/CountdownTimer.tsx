import React, { useState, useEffect } from "react";
import { parseJwt } from "./JWTParser";
import { Typography, Box } from "@mui/material";

/**
 * CountdownTimer Component
 * Displays remaining time until token expiration
 */
const CountdownTimer: React.FC = () => {
  // State Management
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Token Check
  useEffect(() => {
    const checkToken = () => {
      // Get token from storage
      const token = localStorage.getItem("token");
      if (!token) {
        setTimeLeft(null);
        return;
      }

      // Decode and validate token
      const decodedToken = parseJwt(token);
      if (!decodedToken || !decodedToken.exp) {
        setTimeLeft(null);
        return;
      }

      // Calculate remaining time
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const remainingTime = expirationTime - currentTime;
      setTimeLeft(Math.max(remainingTime, 0));
    };

    // Initialize timer and event listeners
    checkToken();
    const interval = setInterval(checkToken, 1000);

    window.addEventListener("storage", checkToken);

    // Cleanup function
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  /**
   * Helper Functions
   */
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Component Render
  return (
    <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
      <Typography
        variant="body2"
        sx={{
          // Warning color when less than 5 minutes remaining
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
