import NutritionalDetails from "./NutritionalDetails";

export default class Food {
  constructor(
    public name: string = "",
    public quantity: number = 0,
    public nutritionalDetails: NutritionalDetails = new NutritionalDetails()
  ) {}
}
