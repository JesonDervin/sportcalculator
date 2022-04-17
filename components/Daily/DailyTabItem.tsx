import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, Delete } from "@mui/icons-material";
import * as React from "react";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import AddIngredientDialog from "../Food/AddIngredientDialog";
import { FoodActionType, FoodsReducer } from "../../state/Food/FoodListState";
import DailyFoodDetails from "./DailyFoodDetails";
import FoodHelper from "../../Models/Helpers/FoodHelper";

export default function DailyTabItem(props: { item: Meal }) {
  const [state, dispatch] = React.useReducer(FoodsReducer, [
    ...props.item.foods,
  ]);

  const handleDelete = (index: number) => {
    dispatch({ type: FoodActionType.REMOVE, index: index });
  };

  const handleAdd = (newFood: Food) => {
    dispatch({
      type: FoodActionType.ADD,
      food: newFood,
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List>
        {state.map((value: Food, index: number) => {
          return (
            <div key={index}>
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary={formatFood(
                    value.name,
                    value.quantity,
                    FoodHelper.calculateCalories(
                      value.protein,
                      value.carbohydrate,
                      value.lipid
                    )
                  )}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <DailyFoodDetails
                  protein={value.protein}
                  carbohydrate={value.carbohydrate}
                  lipid={value.lipid}
                  deleteMeal={() => handleDelete(index)}
                />
              </Collapse>
            </div>
          );
        })}
        <AddIngredientDialog handleAdd={handleAdd} />
      </List>
    </div>
  );
}

function formatFood(name: string, quantity: number, calories: number) {
  return `${name} - ${quantity}g ${calories}kcal`;
}
