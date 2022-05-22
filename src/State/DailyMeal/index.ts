import { selector, atom, selectorFamily } from "recoil";
import { DateTime } from "luxon";
import DailyMeals from "../../Models/DailyMeals";
import { MealType } from "../../Models/MealType";
import Meal from "../../Models/Meal";
import {
  getLocalStorageDailies,
  setLocalStorageDailies,
} from "../../Services/DailyMealsService";
import Food from "../../Models/Food";

export const dailiesMealsState = atom({
  key: "dailiesMealsState",
  default: [] as DailyMeals[],
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window !== "undefined") {
        setSelf(getLocalStorageDailies());

        onSet((newValue) => {
          setLocalStorageDailies(newValue);
        });
      }
    },
  ],
});

export const todayDailyMealState = selector<DailyMeals>({
  key: "todayDailyMealState",
  get: ({ get }) => {
    const today = DateTime.now().toISODate();
    const dailies = get(dailiesMealsState);
    const todayDaily = dailies.filter((d) => d.date === today)[0];
    return (
      todayDaily ??
      new DailyMeals(
        new Meal(MealType.Breakfast),
        new Meal(MealType.Lunch),
        new Meal(MealType.Snack),
        new Meal(MealType.Dinner)
      )
    );
  },
});

export const todayMealFoodsPerType = selectorFamily<Food[], MealType>({
  key: "todayMealFoodsPerType",
  get:
    (mealType: MealType) =>
    ({ get }) => {
      switch (mealType) {
        case MealType.Breakfast:
          return get(todayDailyMealState).breakfast.foods;
        case MealType.Lunch:
          return get(todayDailyMealState).lunch.foods;
        case MealType.Snack:
          return get(todayDailyMealState).snack.foods;
        case MealType.Dinner:
          return get(todayDailyMealState).dinner.foods;
        default:
          throw "invalid type";
      }
    },
  set:
    (mealType: MealType) =>
    ({ get, set, reset }, newValue) => {
      const newFoods = newValue as Food[];
      const todayMeals = { ...get(todayDailyMealState) };
      const today = DateTime.now().toISODate();
      const copyDaily = [...get(dailiesMealsState)];
      const todayIndex = copyDaily.findIndex((f) => f.date === today);
      switch (mealType) {
        case MealType.Breakfast:
          copyDaily[todayIndex] = new DailyMeals(
            new Meal(MealType.Breakfast, newFoods),
            todayMeals.lunch,
            todayMeals.snack,
            todayMeals.dinner
          );
          break;
        case MealType.Lunch:
          copyDaily[todayIndex] = new DailyMeals(
            todayMeals.breakfast,
            new Meal(MealType.Lunch, newFoods),
            todayMeals.snack,
            todayMeals.dinner
          );
          break;
        case MealType.Snack:
          copyDaily[todayIndex] = new DailyMeals(
            todayMeals.breakfast,
            todayMeals.lunch,
            new Meal(MealType.Snack, newFoods),
            todayMeals.dinner
          );
          break;
        case MealType.Dinner:
          copyDaily[todayIndex] = new DailyMeals(
            todayMeals.breakfast,
            todayMeals.lunch,
            todayMeals.snack,
            new Meal(MealType.Dinner, newFoods)
          );
          break;
        default:
          throw "invalid type";
      }
      set(dailiesMealsState, copyDaily);
    },
});
