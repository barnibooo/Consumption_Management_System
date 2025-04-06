import React, { useState, useEffect } from "react";
import { parseJwt } from "./JWTParser";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    const decodedToken = parseJwt(token);
    if (!decodedToken || !decodedToken.exp || !decodedToken.iat) {
      console.error("Invalid token format.");
      return;
    }

    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const issuedAtTime = decodedToken.iat * 1000; // Convert to milliseconds
    const totalDuration = expirationTime - issuedAtTime;

    const updateTimer = () => {
      const currentTime = Date.now();
      const remainingTime = expirationTime - currentTime;
      setTimeLeft(Math.max(remainingTime, 0)); // Ensure no negative values
    };

    updateTimer(); // Initialize the timer
    const interval = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  if (timeLeft === null) {
    return <div>Loading...</div>;
  }

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {timeLeft > 0 ? (
        <p>Time left: {formatTime(timeLeft)}</p>
      ) : (
        <p>Token has expired.</p>
      )}
    </div>
  );
};

export default CountdownTimer;
