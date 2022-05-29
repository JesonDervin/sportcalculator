import Food from "../../Models/Food";

export interface FoodsAction {
  type: FoodsActionType;
  newFood?: Food;
  index?: number;
  initFood?: Food[];
}

export enum FoodsActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
  INIT = "INIT",
}

export const FoodsReducer = (state: Food[], action: FoodsAction) => {
  const { type, newFood, index, initFood } = action;
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
    case FoodsActionType.INIT: {
      if (initFood) {
        return [...initFood];
      }
      return state;
    }
    default:
      return state;
  }
};
