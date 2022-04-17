import Food from "../../Models/Food";

export interface FoodAction {
  type: FoodActionType;
  food?: Food;
  index?: number;
}
export enum FoodActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

export const FoodsReducer = (state: Food[], action: FoodAction) => {
  const { type, food, index } = action;
  switch (type) {
    case FoodActionType.ADD:
      if (food) {
        return [...state, food];
      }
      return state;
    case FoodActionType.REMOVE:
      if (typeof index !== "undefined") {
        const newState = [...state];
        newState.splice(index, 1);
        return [...newState];
      }
      return state;
    default:
      return state;
  }
};
