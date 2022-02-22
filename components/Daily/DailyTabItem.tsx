import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as React from "react";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import NutritionalDetails from "../../Models/NutritionalDetails";
export default function DailyTabItem(item: Meal) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List>
        {item.foods.map((value: Food, index) => {
          return (
            <div key={index}>
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary={formatFood(
                    value.name,
                    value.quantity,
                    value.nutritionalValue.Calories
                  )}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={formatFoodDetails(value.nutritionalValue)}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </div>
  );
}

function formatFood(name: string, quantity: number, calories: number) {
  return `${name} - ${quantity}g ${calories}kcal`;
}

function formatFoodDetails(details: NutritionalDetails) {
  let output = "";
  for (const property in details) {
    output += `${property}: ${details[property]}g `;
  }
  return output;
}
