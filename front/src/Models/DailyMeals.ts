import Meal from "./Meal";
import { DateTime } from "luxon";

export default class DailyMeals {
  constructor(
    public breakfast: Meal,
    public lunch: Meal,
    public snack: Meal,
    public dinner: Meal,
    public date: string = DateTime.now().toISODate()
  ) {}
}
