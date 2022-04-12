import Food from "../../Models/Food";

export interface FoodAction {
    type: FoodActionType;
    food: Food;
    index: number;
  }
export enum FoodActionType {
    ADD = "ADD",
    REMOVE = "REMOVE",
  }

  export const FoodsReducer = (state: Food[], action: FoodAction) => {
    const { type, food, index } = action;
    switch (type) {
      case FoodActionType.ADD:
        return [...state, food];
      case FoodActionType.REMOVE:
        state.splice(index, 1);
        return state;
      default:
        return state;
    }
  };
  