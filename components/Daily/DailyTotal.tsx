import { Box } from "@mui/material";
import * as React from "react";
import Meal from "../../src/Models/Meal";
import TotalFood from "../../src/Models/TotalFood";
import TotalMealTable from "../Meal/TotalMealTable";
import TotalMealTableMobile from "../Meal/TotalMealTableMobile";

interface DailyTotalProps {
  meals: Meal[];
}

export default function DailyTotal(props: DailyTotalProps) {
  const { meals } = props;
  const totalFood = new TotalFood(meals.flatMap((meal) => meal.foods));
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
