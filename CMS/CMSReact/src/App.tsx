import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const cards = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: `This is the description for card ${index + 1}.`,
}));

const ResponsiveGrid: React.FC = () => {
  return (
    <Grid container spacing={2} padding={2}>
      {cards.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              minHeight: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResponsiveGrid;
