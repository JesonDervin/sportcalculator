import Food from "./Food";
import Meal from "./Meal";
import FoodHelper from "./Helpers/FoodHelper";

export default class TotalMeal {
  private allFoods: Food[];
  constructor(meals: Meal[]) {
    this.allFoods = meals.flatMap((meal) => meal.foods);
  }

  public get quantity(): number {
    return this.allFoods.reduce(
      (previous: number, current: Food) => previous + Number(current.quantity),
      0
    );
  }

  public get protein(): number {
    return this.allFoods.reduce(
      (previous: number, current: Food) => previous + Number(current.protein),
      0
    );
  }

  public get carbohydrate(): number {
    return this.allFoods.reduce(
      (previous: number, current: Food) =>
        previous + Number(current.carbohydrate),
      0
    );
  }

  public get lipid(): number {
    return this.allFoods.reduce(
      (previous: number, current: Food) => previous + Number(current.lipid),
      0
    );
  }

  public get calories(): number {
    return FoodHelper.calculateCalories(
      this.protein,
      this.carbohydrate,
      this.lipid
    );
  }
}
