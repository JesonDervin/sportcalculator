import { Divider, Stack } from "@mui/material";
import * as React from "react";
import Meal from "../../src/Models/Meal";
import TotalFood from "../../src/Models/TotalMeal";
import TotalMealTable from "../Meal/TotalMealTable";

interface DailyTotalProps {
  meals: Meal[];
}

export default function DailyTotal(props: DailyTotalProps) {
  const { meals } = props;
  const totalFood = new TotalFood(meals.flatMap((meal) => meal.foods));
  return (
    <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
      <TotalMealTable total={totalFood} />
    </Stack>
  );
}
