import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as React from "react";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import NutritionalDetails from "../../Models/NutritionalDetails";
import AddIngredientDialog from "../Food/AddIngredientDialog";

const getCalories = (protein: number, carbohydrate: number, lipid: number) => {
  return protein * 4 + carbohydrate * 4 + lipid * 9;
};

export default function DailyTabItem(props: { item: Meal }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List>
        {props.item.foods.map((value: Food, index) => {
          return (
            <div key={index}>
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary={formatFood(
                    value.name,
                    value.quantity,
                    getCalories(
                      value.nutritionalDetails.protein,
                      value.nutritionalDetails.carbohydrate,
                      value.nutritionalDetails.lipid
                    )
                  )}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={formatFoodDetails(value.nutritionalDetails)}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          );
        })}
        <AddIngredientDialog />
      </List>
    </div>
  );
}

function formatFood(name: string, quantity: number, calories: number) {
  return `${name} - ${quantity}g ${calories}kcal`;
}

function formatFoodDetails(details: NutritionalDetails) {
  let output = "";
  let k: keyof typeof details;
  for (k in details) {
    output += `${k}: ${details[k]}g `;
  }
  return output;
}
