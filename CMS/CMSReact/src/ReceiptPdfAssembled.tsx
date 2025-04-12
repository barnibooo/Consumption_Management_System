import { CardActions, Button, Box } from "@mui/material";
import { useState } from "react";
import ConsumptionPDF from "./ReceiptPdf";
import SendIcon from "@mui/icons-material/Send";
import PrintIcon from "@mui/icons-material/Print";
import { pdf } from "@react-pdf/renderer";
import type { ConsumptionItem } from "./CustomerCheckout";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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

  const handlePrint = async () => {
    const blob = await pdf(
      <ConsumptionPDF
        customer={customer}
        consumption={checkoutData.consumption}
        totalAmount={checkoutData.totalAmount}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url);

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
        URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <>
      <CardActions>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onFinalize}
          sx={{
            bgcolor: "#BFA181",
            color: "#d5d6d6",
          }}
        >
          Véglegesítés
        </Button>
        <Button
          variant="contained"
          endIcon={<VisibilityOutlinedIcon />}
          onClick={() => setShowPDF(true)}
          sx={{
            bgcolor: "#BFA181",
            color: "#d5d6d6",
            ml: 2,
          }}
        >
          PDF megtekintése
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            bgcolor: "#BFA181",
            color: "#d5d6d6",
            ml: 2,
          }}
        >
          Nyomtatás
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
          }}
        >
          <Button
            onClick={() => setShowPDF(false)}
            sx={{
              color: "#d5d6d6",
              m: 2,
            }}
          >
            Bezárás
          </Button>
          <Box sx={{ width: "90%", height: "90%" }}>
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
