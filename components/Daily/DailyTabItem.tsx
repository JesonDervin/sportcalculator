import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as React from "react";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import AddIngredientDialog from "../Food/AddIngredientDialog";

const getCalories = (protein: number, carbohydrate: number, lipid: number) => {
  return protein * 4 + carbohydrate * 4 + lipid * 9;
};

export default function DailyTabItem(props: { item: Meal }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [currentFoods, setCurrentFoods] = React.useState<Food[]>(
    props.item.foods
  );

  const handleAddFood = (newFood: Food) => {
    setCurrentFoods((oldFoods) => [...oldFoods, newFood]);
  };

  return (
    <div>
      <List>
        {currentFoods.map((value: Food, index) => {
          return (
            <div key={index}>
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary={formatFood(
                    value.name,
                    value.quantity,
                    getCalories(value.protein, value.carbohydrate, value.lipid)
                  )}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={formatFoodDetails(
                        value.protein,
                        value.carbohydrate,
                        value.lipid
                      )}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          );
        })}
        <AddIngredientDialog onAddFood={handleAddFood} />
      </List>
    </div>
  );
}

function formatFood(name: string, quantity: number, calories: number) {
  return `${name} - ${quantity}g ${calories}kcal`;
}

function formatFoodDetails(
  protein: number,
  carbohydrate: number,
  lipid: number
) {
  let output = "";
  output += `protein: ${protein}g`;
  output += `carbohydrate: ${carbohydrate}g`;
  output += `lipid: ${lipid}g`;
  return output;
}
