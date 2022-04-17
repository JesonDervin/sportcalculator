import { Divider, Stack } from "@mui/material";
import * as React from "react";
import Meal from "../../Models/Meal";
import TotalMeal from "../../Models/TotalMeal";
import TotalMealTable from "../Meal/TotalMealTable";

interface DailyTotalProps {
  meals: Meal[];
}

export default function DailyTotal(props: DailyTotalProps) {
  const { meals } = props;
  const totalMeal = new TotalMeal(meals);
  return (
    <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
      <TotalMealTable totalMeal={totalMeal} />
    </Stack>
  );
}
