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

    checkToken(); // Initial check
    const interval = setInterval(checkToken, 1000);
    
    // Listen for token updates
    window.addEventListener('storage', checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
      <Typography
        variant="body2"
        sx={{
          color: timeLeft && timeLeft < 300000 ? '#ff4444' : '#d5d6d6',
          fontSize: '0.9rem'
        }}
      >
        {timeLeft ? formatTime(timeLeft) : 'Token expired'}
      </Typography>
    </Box>
  );
};

export default CountdownTimer;