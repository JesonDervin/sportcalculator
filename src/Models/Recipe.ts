import Food from "./Food";

export default class Recipe {
  constructor(public name: string = "", public foods: Food[] = []) {}
}
