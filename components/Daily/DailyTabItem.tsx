import * as React from "react";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import AddIngredientDialog from "../Food/AddIngredientDialog";
import MealTable from "../Meal/MealTable";
import { MealType } from "../../Models/MealType";

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
    <div>
      <MealTable mealFood={meal.foods} deleteFood={handleDelete} />
      <AddIngredientDialog handleAdd={handleAdd} />
    </div>
  );
}
