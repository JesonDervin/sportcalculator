import * as React from "react";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import AddIngredientDialog from "../Food/AddIngredientDialog";
import { FoodActionType, FoodsReducer } from "../../state/Food/FoodListState";
import MealTable from "../Meal/MealTable";

export default function DailyTabItem(props: { item: Meal }) {
  const { item: meal } = props;

  const [state, dispatch] = React.useReducer(FoodsReducer, [...meal.foods]);

  const handleDelete = (index: number) => {
    dispatch({ type: FoodActionType.REMOVE, index: index });
  };

  const handleAdd = (newFood: Food) => {
    dispatch({
      type: FoodActionType.ADD,
      food: newFood,
    });
  };

  return (
    <div>
      <MealTable mealFood={state} deleteFood={handleDelete} />
      <AddIngredientDialog handleAdd={handleAdd} />
    </div>
  );
}
