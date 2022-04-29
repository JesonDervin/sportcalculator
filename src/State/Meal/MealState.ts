import Food from "../../Models/Food";
import Meal from "../../Models/Meal";
import { MealType } from "../../Models/MealType";

export interface MealAction {
  type: MealActionType;
  mealType: MealType;
  food?: Food;
  foodIndex?: number;
}

export enum MealActionType {
  ADDFOOD = "ADDFOOD",
  REMOVEFOOD = "REMOVEFOOD",
}

// * handle state for all day meal
export const MealReducer = (state: Meal[], action: MealAction) => {
  const { type, mealType, food, foodIndex } = action;
  switch (type) {
    case MealActionType.ADDFOOD:
      if (food) {
        const targetedMeal = state.filter((f) => f.type === mealType)[0];
        targetedMeal.foods.push(food);
        return [...state];
      }
      return state;
    case MealActionType.REMOVEFOOD:
      if (typeof foodIndex !== "undefined") {
        const targetedMeal = state.filter((f) => f.type === mealType)[0];
        targetedMeal.foods.splice(foodIndex, 1);
        // returning state because filter return a reference and not a shallow copy
        return [...state];
      }
      return state;
    default:
      return state;
  }
};
