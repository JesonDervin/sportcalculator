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

export const dailyMealStatePerDate = selectorFamily<DailyMeals, string>({
  key: "dailyMealStatePerDate",
  get:
    (date: string) =>
    ({ get }) => {
      const meals = get(dailiesMealsState);
      const mealAtDate = meals.filter((d) => d.date === date)[0];
      return (
        mealAtDate ??
        new DailyMeals(
          new Meal(MealType.Breakfast),
          new Meal(MealType.Lunch),
          new Meal(MealType.Snack),
          new Meal(MealType.Dinner)
        )
      );
    },
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

export const todayBreakfastFoods = selector<Food[]>({
  key: "todayBreakfastFoods",
  get: ({ get }) => {
    const todayMeals = get(todayDailyMealState);
    return todayMeals.breakfast.foods;
  },
  set: ({ get, set }, newValue) => {
    const newFoods = newValue as Food[];
    const todayMeals = get(todayDailyMealState);
    const today = DateTime.now().toISODate();
    const copyDaily = get(dailiesMealsState);
    const todayIndex = copyDaily.findIndex((f) => f.date === today);
    copyDaily[todayIndex] = new DailyMeals(
      new Meal(MealType.Breakfast, newFoods),
      todayMeals.lunch,
      todayMeals.snack,
      todayMeals.dinner
    );
    set(dailiesMealsState, copyDaily);
  },
});

export const todayLunchFoods = selector<Food[]>({
  key: "todayLunchFoods",
  get: ({ get }) => {
    const todayMeals = get(todayDailyMealState);
    return todayMeals.lunch.foods;
  },
  set: ({ get, set }, newValue) => {
    const newFoods = newValue as Food[];
    const todayMeals = get(todayDailyMealState);
    const today = DateTime.now().toISODate();
    const copyDaily = get(dailiesMealsState);
    const todayIndex = copyDaily.findIndex((f) => f.date === today);
    copyDaily[todayIndex] = new DailyMeals(
      todayMeals.breakfast,
      new Meal(MealType.Lunch, newFoods),
      todayMeals.snack,
      todayMeals.dinner
    );
    set(dailiesMealsState, copyDaily);
  },
});

export const todaySnackFoods = selector<Food[]>({
  key: "todaySnackFoods",
  get: ({ get }) => {
    const todayMeals = get(todayDailyMealState);
    return todayMeals.snack.foods;
  },
  set: ({ get, set }, newValue) => {
    const newFoods = newValue as Food[];
    const todayMeals = get(todayDailyMealState);
    const today = DateTime.now().toISODate();
    const copyDaily = get(dailiesMealsState);
    const todayIndex = copyDaily.findIndex((f) => f.date === today);
    copyDaily[todayIndex] = new DailyMeals(
      todayMeals.breakfast,
      todayMeals.lunch,
      new Meal(MealType.Snack, newFoods),
      todayMeals.dinner
    );
    set(dailiesMealsState, copyDaily);
  },
});

export const todayDinnerFoods = selector<Food[]>({
  key: "todayDinnerFoods",
  get: ({ get }) => {
    const todayMeals = get(todayDailyMealState);
    return todayMeals.dinner.foods;
  },
  set: ({ get, set }, newValue) => {
    const newFoods = newValue as Food[];
    const todayMeals = get(todayDailyMealState);
    const today = DateTime.now().toISODate();
    const copyDaily = get(dailiesMealsState);
    const todayIndex = copyDaily.findIndex((f) => f.date === today);
    copyDaily[todayIndex] = new DailyMeals(
      todayMeals.breakfast,
      todayMeals.lunch,
      todayMeals.snack,
      new Meal(MealType.Dinner, newFoods)
    );
    set(dailiesMealsState, copyDaily);
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
