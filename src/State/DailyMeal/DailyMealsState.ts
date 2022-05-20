import DailyMeals from "../../Models/DailyMeals";
export interface DailyMealsAction {
  type: DailyMealsActionType;
  daily: DailyMeals;
}
export enum DailyMealsActionType {
  ADDUPDATEDAILY = "ADDUPDATEDAILY",
}

export const DailyMealReducer = (
  state: DailyMeals[],
  action: DailyMealsAction
) => {
  const { type, daily } = action;
  switch (type) {
    case DailyMealsActionType.ADDUPDATEDAILY: {
      const newState = [...state];
      const targetDaily = newState.filter((f) => f.date === daily.date)[0];
      if (targetDaily) {
        targetDaily.breakfast = daily.breakfast;
        targetDaily.lunch = daily.lunch;
        targetDaily.snack = daily.snack;
        targetDaily.dinner = daily.dinner;
      } else {
        newState.push(daily);
      }
      return newState;
    }
    default:
      return state;
  }
};
