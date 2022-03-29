import Food from "./Food";

export default class Meal {
  constructor(public name: string = "", public foods: Food[] = []) {}
}
