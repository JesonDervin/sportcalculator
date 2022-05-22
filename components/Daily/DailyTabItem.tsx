import * as React from "react";
import Meal from "../../src/Models/Meal";
import Food from "../../src/Models/Food";
import FoodsTable from "../Food/FoodsTable";
import { MealType } from "../../src/Models/MealType";
import { Box } from "@mui/material";
import FoodsMobileTable from "../Food/FoodsMobileTable";
import { useSetRecoilState } from "recoil";
import { todayMealFoodsPerType } from "../../src/State/DailyMeal";
interface DailyTabItemProps {
  meal: Meal;
  mealType: MealType;
}

export default function DailyTabItem(props: DailyTabItemProps) {
  const { meal, mealType } = props;

  const setTypedMeal = useSetRecoilState(todayMealFoodsPerType(mealType));
  const [foods, setFoods] = React.useState(meal.foods);

  const handleDelete = (index: number) => {
    foods.splice(index, 1);
    setFoods([...foods]);
    setTypedMeal([...foods]);
  };

  const handleAdd = (newFood: Food) => {
    setFoods([...foods, newFood]);
    setTypedMeal([...foods, newFood]);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <FoodsTable
          foods={foods}
          deleteFood={handleDelete}
          onAddFood={handleAdd}
        />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <FoodsMobileTable
          foods={foods}
          deleteFood={handleDelete}
          onAddFood={handleAdd}
        ></FoodsMobileTable>
      </Box>
    </React.Fragment>
  );
}
