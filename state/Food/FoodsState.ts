import Food from "../../Models/Food";

export interface FoodsAction {
  type: FoodsActionType;
  newFood?: Food;
  index?: number;
}

export enum FoodsActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

export const FoodsReducer = (state: Food[], action: FoodsAction) => {
  const { type, newFood, index } = action;
  switch (type) {
    case FoodsActionType.ADD:
      if (newFood) {
        state.push(newFood);
        return [...state];
      }
      return state;
    case FoodsActionType.REMOVE:
      if (typeof index !== "undefined") {
        state.splice(index, 1);
        return [...state];
      }
      return state;
    default:
      return state;
  }
};
