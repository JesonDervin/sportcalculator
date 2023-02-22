import { Delete } from "@mui/icons-material";
import { IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import * as React from "react";

interface DailyFoodDetailsProps {
  protein: number;
  carbohydrate: number;
  lipid: number;
  deleteMeal: () => void;
}

export default function DailyFoodDetails(props: DailyFoodDetailsProps) {
  const { protein, carbohydrate, lipid, deleteMeal } = props;
  const handleDelete = () => {
    deleteMeal();
  };
  return (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary={<span>protein : {protein}g</span>} />
        <ListItemText primary={<span>carbohydrate : {carbohydrate}g</span>} />
        <ListItemText primary={<span>lipid : {lipid}g</span>} />
        <IconButton edge="end" onClick={handleDelete}>
          <Delete aria-label="delete" color="error" />
        </IconButton>
      </ListItemButton>
    </List>
  );
}
