import { number } from "prop-types";
import Food from "./Food";

export default class Recipe {
  constructor(
    public name: string = "",
    public id: string = "",
    public foods: Food[] = []
  ) {}
  get totalQuantity() {
    return this.foods.reduce(
      (previous: number, current: Food) => previous + Number(current.quantity),
      0
    );
  }

  proteinPerQuantity(quantity = 100): number {
    const totalProtein = this.foods.reduce(
      (previous: number, current: Food) => previous + Number(current.protein),
      0
    );
    const value = (totalProtein / this.totalQuantity) * quantity;
    return Number(value.toFixed(2));
  }

  carbohydratePerQuantity(quantity = 100): number {
    const totalCarbohydrate = this.foods.reduce(
      (previous: number, current: Food) =>
        previous + Number(current.carbohydrate),
      0
    );
    const value = (totalCarbohydrate / this.totalQuantity) * quantity;
    return Number(value.toFixed(2));
  }

  lipidPerQuantity(quantity = 100): number {
    const totalLipid = this.foods.reduce(
      (previous: number, current: Food) => previous + Number(current.lipid),
      0
    );
    const value = (totalLipid / this.totalQuantity) * quantity;
    return Number(value.toFixed(2));
  }
}
