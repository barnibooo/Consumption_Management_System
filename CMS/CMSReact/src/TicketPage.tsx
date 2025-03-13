import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  CircularProgress,
  Alert,
  AlertTitle,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface ticketItem {
  imagePath: string | undefined;
  ticketId: number;
  ticketName: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
}

interface admissionItem {
  admissionId: number;
  admissionName: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
  imagePath: string;
}

const iconStyle = {
  fontSize: 35,
  color: "#d5d6d6",
  "&:hover": {
    color: "#BFA181",
  },
};

const categoryIcons: { [key: string]: React.ReactElement } = {
  Belépő: <ConfirmationNumberOutlinedIcon sx={iconStyle} />,
  Kiegészítő: <ExtensionOutlinedIcon sx={iconStyle} />,
};

const Dashboard: React.FC = () => {
  const [ticketItems, setticketItems] = useState<ticketItem[]>([]);
  const [admissionItems, setAdmissionItems] = useState<admissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orders, setOrders] = useState<ticketItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [finalizedOrders, setFinalizedOrders] = useState<
    { ticketId: number }[]
  >([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [openSuccessDialogs, setOpenSuccessDialogs] = useState<boolean[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [openDialogs, setOpenDialogs] = useState<boolean[]>([]);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAddToOrder = (item: ticketItem) => {
    setOrders((prevOrders) => {
      if (item.category === "Belépő") {
        if (prevOrders.some((orderItem) => orderItem.category === "Belépő")) {
          return prevOrders;
        }
      } else {
        if (
          prevOrders.some((orderItem) => orderItem.ticketId === item.ticketId)
        ) {
          return prevOrders;
        }
      }
      return [...prevOrders, item];
    });
  };

  const handleDeleteFromOrder = (item: ticketItem) => {
    setOrders((prevOrders) =>
      prevOrders.filter((ticketItem) => ticketItem.ticketId !== item.ticketId)
    );
  };

  const calculateTotalPrice = () => {
    return orders.reduce((total, ticketItem) => total + ticketItem.price, 0);
  };

  useEffect(() => {
    const fetchTickets = axios.get("https://localhost:5000/api/Tickets");
    const fetchAdmissions = axios.get("https://localhost:5000/api/Admissions");

    Promise.all([fetchTickets, fetchAdmissions])
      .then(([ticketsResponse, admissionsResponse]) => {
        if (Array.isArray(ticketsResponse.data)) {
          setticketItems(ticketsResponse.data);
        } else {
          console.error("Hibás API válasz: nem tömb", ticketsResponse.data);
        }

        if (Array.isArray(admissionsResponse.data)) {
          const admissionsAsTickets = admissionsResponse.data.map(
            (admission: admissionItem) => ({
              ticketId: admission.admissionId,
              ticketName: admission.admissionName,
              category: admission.category,
              price: admission.price,
              description: admission.description,
              isAvailable: admission.isAvailable,
              imagePath: admission.imagePath,
            })
          );
          setticketItems((prevItems) => [...prevItems, ...admissionsAsTickets]);
        } else {
          console.error("Hibás API válasz: nem tömb", admissionsResponse.data);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={120} sx={{ color: "#bfa181" }} />
      </Box>
    );
  if (error)
    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box width="40%">
            <Alert severity="error">
              <AlertTitle>Hiba</AlertTitle>
              Hiba történt az adatok betöltése közben!
            </Alert>
          </Box>
        </Box>
      </ThemeProvider>
    );

  var l = ticketItems.length;

  const getUniqueCategories = () => {
    const categories: string[] = [];

    for (let i = 0; i < l; i++) {
      const category = ticketItems[i].category;
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
    return categories;
  };

  const uniqueCategories = getUniqueCategories();

  const filteredCategories = uniqueCategories.filter(
    (category) => category !== "Egyéb"
  );

  const hasEgyebItems = ticketItems.some((item) => item.category === "Egyéb");

  const filteredticketItems = selectedCategory
    ? ticketItems.filter((item) => item.category === selectedCategory)
    : ticketItems;

  const handleOpenDialog = () => {
    setOpenDialogs(new Array(orders.length).fill(true));
  };

  const handleCloseDialog = (index: number) => {
    setOpenDialogs((prev) => {
      const newDialogs = [...prev];
      newDialogs[index] = false;
      return newDialogs;
    });
  };

  const handleIdChange = (index: number, value: string) => {
    setIds((prev) => {
      const newIds = [...prev];
      newIds[index] = value;
      return newIds;
    });
  };

  const handleSubmitOrder = () => {
    const orderList = orders.map((ticketItem, index) => ({
      ticketId: ticketItem.ticketId,
      id: ids[index],
    }));

    setFinalizedOrders(orderList);

    const currentDateTime = new Date().toISOString();

    // Log each order individually
    orderList.forEach((order, index) => {
      console.log({
        cardId: ids[index],
        name: "Order Name",
        ticketsIds: [{ ticketId: order.ticketId }],
        createdAt: currentDateTime,
      });
    });

    // Simulate successful order submission
    setOrderId("mockOrderId");
    setOpenSuccessDialogs(new Array(orders.length).fill(true));
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const hasBelepoInOrder = orders.some((item) => item.category === "Belépő");

  return (
    <>
      <Box
        display="flex"
        height="calc(100vh - 64px)"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "flex" },
            flexDirection: { xs: "column", md: "row" },
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
            <IconButton onClick={() => handleCategoryClick(null)}>
              <AppsIcon
                sx={{
                  fontSize: 35,
                  color: "#d5d6d6",
                  "&:hover": {
                    color: "#BFA181",
                  },
                  "&:active": {
                    color: "#BFA181",
                  },
                }}
              />
            </IconButton>
            {filteredCategories.map((category) => (
              <IconButton
                key={category}
                onClick={() => handleCategoryClick(category)}
                sx={{ iconStyle }}
              >
                {categoryIcons[category]}
              </IconButton>
            ))}
            <IconButton
              onClick={() => handleCategoryClick("Egyéb")}
              disabled={!hasEgyebItems}
              sx={{
                fontSize: 35,
                color: "#d5d6d6",
                "&:hover": {
                  color: "#BFA181",
                },
                "&:active": {
                  color: "#BFA181",
                },
              }}
            >
              {categoryIcons["Egyéb"]}
            </IconButton>
          </Stack>
        </Box>

        {/* Orders Section */}
        <Box
          mb={{ xs: 2, md: 3 }}
          width={{ xs: "90%", md: "70%", lg: "40%", xl: "30%" }}
          display="flex"
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ height: "93%", p: 2 }}
        >
          <Card
            sx={{
              width: {
                xs: "100%",
                md: "100%",
              },
              height: "100%",
              backgroundColor: "#202938",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader
              title="Rendelés"
              subheader={`Összesen: ${calculateTotalPrice()} Ft`}
              sx={{
                "& .MuiCardHeader-subheader": {
                  color: "#d5d6d6",
                },
                "& .MuiCardHeader-title": {
                  color: "#e7e6dd",
                },
              }}
            />
            {/* Görgethető lista konténer */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                maxHeight: "550px",
                padding: 1,
              }}
            >
              <List dense>
                {orders.map((ticketItem, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteFromOrder(ticketItem)}
                      >
                        <DeleteOutlineOutlinedIcon
                          sx={{
                            fontSize: 35,
                            color: "#d5d6d6",
                            "&:hover": {
                              color: "#BFA181",
                            },
                          }}
                        />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      {categoryIcons[ticketItem.category]}
                    </ListItemAvatar>
                    <Typography variant="body2" color="#e7e6dd" fontSize={16}>
                      {ticketItem.ticketName} <br /> {ticketItem.price} Ft
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            {/* Gomb a rendelés leadására */}
            <CardActions
              disableSpacing
              sx={{ mt: "auto", justifyContent: "center", paddingBottom: 2 }}
            >
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  m: 2,
                  backgroundColor: "#BFA181",
                  width: "80%",
                }}
                onClick={handleOpenDialog}
                disabled={!hasBelepoInOrder}
              >
                Jegyfoglalás
              </Button>
            </CardActions>
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
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              margin={2}
            >
              {filteredticketItems.map((item) => (
                <Card
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "45%",
                      md: "90%",
                      lg: "45%",
                      xl: "30%",
                    },
                    background: "#202938",
                    color: "#d5d6d6",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={item.ticketId}
                >
                  <CardHeader
                    title={item.ticketName}
                    subheader={item.category}
                    sx={{
                      "& .MuiCardHeader-subheader": { color: "#d5d6d6" },
                    }}
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imagePath}
                    alt="Kép"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography mb={2}>{item.description}</Typography>
                    <Box sx={{ mt: "auto" }}>
                      <Typography fontWeight="bold">
                        {item.isAvailable ? "Elérhető" : "Nem elérhető"}
                      </Typography>
                      <Typography fontWeight="bold">{item.price} Ft</Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ mt: "auto", justifyContent: "flex-start" }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<AddShoppingCartOutlinedIcon />}
                      onClick={() => handleAddToOrder(item)}
                    >
                      Send
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
