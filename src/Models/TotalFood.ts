import Food from "./Food";
import FoodHelper from "../Helpers/FoodHelper";

export default class TotalFood {
  private allFoods: Food[];
  constructor(foods: Food[]) {
    this.allFoods = foods;
  }

  public get quantity(): number {
    const sum = this.allFoods.reduce(
      (previous: number, current: Food) => previous + Number(current.quantity),
      0
    );
    return Number(sum.toFixed(2));
  }

  public get protein(): number {
    const sum = this.allFoods.reduce(
      (previous: number, current: Food) => previous + Number(current.protein),
      0
    );
    return Number(sum.toFixed(2));
  }

  public get carbohydrate(): number {
    const sum = this.allFoods.reduce(
      (previous: number, current: Food) =>
        previous + Number(current.carbohydrate),
      0
    );
    return Number(sum.toFixed(2));

  }

  public get lipid(): number {
    const sum = this.allFoods.reduce(
      (previous: number, current: Food) => previous + Number(current.lipid),
      0
    );
    return Number(sum.toFixed(2));

  }

  public get calories(): number {
    return FoodHelper.calculateCalories(
      this.protein,
      this.carbohydrate,
      this.lipid
    );
  }
}
