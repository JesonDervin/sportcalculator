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
  const handleDelete = () => {
    props.deleteMeal();
  };
  return (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary={<span>protein : {props.protein}g</span>} />
        <ListItemText
          primary={<span>carbohydrate : {props.carbohydrate}g</span>}
        />
        <ListItemText primary={<span>lipid : {props.lipid}g</span>} />
        <IconButton edge="end" onClick={handleDelete}>
          <Delete aria-label="delete" color="error" />
        </IconButton>
      </ListItemButton>
    </List>
  );
}
