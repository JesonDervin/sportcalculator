import Food from "./Food";
import { MealType } from "./MealType";

export default class Meal {
  constructor(public type: MealType, public foods: Food[] = []) {}
}
