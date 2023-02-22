import { DateTime } from "luxon";
import DailyMeals from "../Models/DailyMeals";
import LocalStorageKeys from "../Models/LocalStorageKeys";
import Meal from "../Models/Meal";
import { MealType } from "../Models/MealType";

export const getLocalStorageDailies = (): DailyMeals[] => {
  let result = [] as DailyMeals[];
  const dailies = localStorage.getItem(LocalStorageKeys.Dailies);
  if (!dailies) {
    result = [
      new DailyMeals(
        new Meal(MealType.Breakfast),
        new Meal(MealType.Lunch),
        new Meal(MealType.Snack),
        new Meal(MealType.Dinner)
      ),
    ];
  } else {
    result = JSON.parse(dailies);
  }
  return result;
};

export const setLocalStorageDailies = (newDailies: DailyMeals[]) => {
  localStorage.setItem(LocalStorageKeys.Dailies, JSON.stringify(newDailies));
};

export const setLocalStorageDailyForDate = (
  date: string,
  newDaily: DailyMeals
): void => {
  const dailies = getLocalStorageDailies();
  const targetDaily = dailies.filter((f) => f.date === date)[0];
  if (targetDaily) {
    targetDaily.breakfast = newDaily.breakfast;
    targetDaily.lunch = newDaily.lunch;
    targetDaily.snack = newDaily.snack;
    targetDaily.dinner = newDaily.dinner;
  } else {
    dailies.push(newDaily);
  }
  localStorage.setItem(LocalStorageKeys.Dailies, JSON.stringify(dailies));
};

export const setTodayDaily = (newDaily: DailyMeals): void => {
  const today = DateTime.now().toISODate();
  setLocalStorageDailyForDate(today, newDaily);
};
