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

  proteinPerQuantity(quantity = 100) {
    const totalProtein = this.foods.reduce(
      (previous: number, current: Food) => previous + Number(current.protein),
      0
    );
    return (totalProtein / this.totalQuantity) * quantity;
  }

  carbohydratePerQuantity(quantity = 100) {
    const totalCarbohydrate = this.foods.reduce(
      (previous: number, current: Food) =>
        previous + Number(current.carbohydrate),
      0
    );
    return (totalCarbohydrate / this.totalQuantity) * quantity;
  }

  lipidPerQuantity(quantity = 100) {
    const totalLipid = this.foods.reduce(
      (previous: number, current: Food) => previous + Number(current.lipid),
      0
    );
    return (totalLipid / this.totalQuantity) * quantity;
  }
}
