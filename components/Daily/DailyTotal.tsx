import { Box } from "@mui/material";
import * as React from "react";
import DailyMeals from "../../src/Models/DailyMeals";
import Meal from "../../src/Models/Meal";
import TotalFood from "../../src/Models/TotalFood";
import TotalMealTable from "../Meal/TotalMealTable";
import TotalMealTableMobile from "../Meal/TotalMealTableMobile";

interface DailyTotalProps {
  meals: DailyMeals;
}

export default function DailyTotal(props: DailyTotalProps) {
  const { meals } = props;
  const allFoods = meals.breakfast.foods
    .concat(meals.lunch.foods)
    .concat(meals.snack.foods)
    .concat(meals.dinner.foods);
  const totalFood = new TotalFood(allFoods);
  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TotalMealTable total={totalFood} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <TotalMealTableMobile total={totalFood} />
      </Box>
    </React.Fragment>
  );
}
