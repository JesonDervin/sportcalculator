import { Box } from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";
import TotalFood from "../../src/Models/TotalFood";
import { dailyMealStatePerDate } from "../../src/State/DailyMeal";
import TotalMealTable from "../Meal/TotalMealTable";
import TotalMealTableMobile from "../Meal/TotalMealTableMobile";

interface DailyTotalProps {
  date: string;
}

export default function DailyTotal(props: DailyTotalProps) {
  const { date } = props;
  const mealState = useRecoilValue(dailyMealStatePerDate(date));
  const allFoods = mealState.breakfast.foods
    .concat(mealState.lunch.foods)
    .concat(mealState.snack.foods)
    .concat(mealState.dinner.foods);
  const totalFood = new TotalFood(allFoods);
  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TotalMealTable total={totalFood} date={date} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <TotalMealTableMobile total={totalFood} date={date} />
      </Box>
    </React.Fragment>
  );
}
