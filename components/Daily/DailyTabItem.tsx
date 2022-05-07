import * as React from "react";
import Meal from "../../src/Models/Meal";
import Food from "../../src/Models/Food";
import FoodsTable from "../Food/FoodsTable";
import { MealType } from "../../src/Models/MealType";
import { Box } from "@mui/material";
import FoodsMobileTable from "../Food/FoodsMobileTable";

interface DailyTabItemProps {
  meal: Meal;
  deleteFood: (mealType: MealType, foodIndex: number) => void;
  addFood: (mealType: MealType, food: Food) => void;
}

export default function DailyTabItem(props: DailyTabItemProps) {
  const { meal, deleteFood, addFood } = props;

  const handleDelete = (index: number) => {
    deleteFood(meal.type, index);
  };

  const handleAdd = (newFood: Food) => {
    addFood(meal.type, newFood);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <FoodsTable
          foods={meal.foods}
          deleteFood={handleDelete}
          onAddFood={handleAdd}
        />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <FoodsMobileTable
          foods={meal.foods}
          deleteFood={handleDelete}
          onAddFood={handleAdd}
        ></FoodsMobileTable>
      </Box>
    </React.Fragment>
  );
}
