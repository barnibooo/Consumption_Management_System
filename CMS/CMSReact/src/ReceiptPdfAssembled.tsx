import {
  CardActions,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import ConsumptionPDF from "./ReceiptPdf";
import SendIcon from "@mui/icons-material/Send";
import type { ConsumptionItem } from "./CustomerCheckout";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface ReceiptPdfAssembledProps {
  customer: {
    name: string;
    customerId: number;
  };
  checkoutData: {
    consumption: ConsumptionItem[];
    totalAmount: number;
  };
  onFinalize: () => void;
}

const ReceiptPdfAssembled = ({
  customer,
  checkoutData,
  onFinalize,
}: ReceiptPdfAssembledProps) => {
  const [showPDF, setShowPDF] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row", // Always row
          justifyContent: "center",
          gap: 1,
          width: "100%",
          p: { xs: 0, sm: 0 },
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#BFA181",
            color: "#d5d6d6",
            flex: 1, // Take equal width
            maxWidth: { xs: "45%", sm: "auto" }, // Limit width on mobile
            "&:hover": {
              bgcolor: "#8B7355",
            },
          }}
          endIcon={<SendIcon />}
          onClick={onFinalize}
        >
          Véglegesítés
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#BFA181",
            color: "#d5d6d6",
            flex: 1, // Take equal width
            maxWidth: { xs: "45%", sm: "auto" }, // Limit width on mobile
            margin: 0,
            "&:hover": {
              bgcolor: "#8B7355",
            },
          }}
          endIcon={<VisibilityOutlinedIcon />}
          onClick={() => setShowPDF(true)}
        >
          PDF
        </Button>
      </CardActions>

      {showPDF && checkoutData && customer && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            // Add touchscreen support
            WebkitOverflowScrolling: "touch",
            // Better touch handling
            "& iframe": {
              WebkitOverflowScrolling: "touch",
              overflow: "auto",
              "-webkit-overflow-scrolling": "touch",
            },
          }}
        >
          <Button
            onClick={() => setShowPDF(false)}
            sx={{
              color: "#d5d6d6",
              m: { xs: 0, sm: 0 },
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 10000,
              mr: { xs: 1, sm: 2 },
            }}
            startIcon={<CloseIcon />}
          >
            {!isMobile && "Bezárás"}
          </Button>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              pt: { xs: 4, sm: 6 }, // Reduced top padding on mobile
              px: { xs: 0, sm: 2 }, // Remove horizontal padding on mobile
              pb: { xs: 0, sm: 2 }, // Remove bottom padding on mobile
            }}
          >
            <ConsumptionPDF
              customer={customer}
              consumption={checkoutData.consumption}
              totalAmount={checkoutData.totalAmount}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ReceiptPdfAssembled;
