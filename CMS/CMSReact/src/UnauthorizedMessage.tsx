import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface UnauthorizedMessageProps {
  isUnauthorized: boolean;
}

const UnauthorizedMessage: React.FC<UnauthorizedMessageProps> = ({
  isUnauthorized,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (isUnauthorized) {
      // Megjelenítjük a Snackbar-t
      setShowSnackbar(true);

      isUnauthorized = false; // Reseteljük a prop értékét, hogy ne jelenjen meg újra
    }
  }, [isUnauthorized]);

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={4000}
      onClose={() => setShowSnackbar(false)} // Bezárás automatikusan vagy manuálisan
    >
      <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
        Az oldal használatához magasabb jogosultság szükséges!
      </Alert>
    </Snackbar>
  );
};

export default UnauthorizedMessage;
