export default class NutritionalDetails {
  constructor(
    public protein: number = 0,
    public carbohydrate: number = 0,
    public lipid: number = 0
  ) {}
  get Calories() {
    return this.protein * 4 + this.carbohydrate * 4 + this.lipid * 9;
  }
}
