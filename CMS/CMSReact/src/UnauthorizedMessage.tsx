import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface UnauthorizedMessageProps {
  isUnauthorized: boolean;
  onResetUnauthorized: () => void; // Callback függvény az isUnauthorized visszaállítására
}

const UnauthorizedMessage: React.FC<UnauthorizedMessageProps> = ({
  isUnauthorized,
  onResetUnauthorized,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (isUnauthorized) {
      setShowSnackbar(true);
    }
  }, [isUnauthorized]);

  const handleClose = () => {
    setShowSnackbar(false);
    onResetUnauthorized(); // Visszaállítjuk az isUnauthorized értékét false-ra
  };

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
        Az oldal használatához magasabb jogosultság szükséges!
      </Alert>
    </Snackbar>
  );
};

export default UnauthorizedMessage;