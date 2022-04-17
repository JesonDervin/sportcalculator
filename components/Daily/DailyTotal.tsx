import { Divider, Stack } from "@mui/material";
import * as React from "react";
import Meal from "../../Models/Meal";
import MealTable from "../Meal/MealTable";

interface DailyTotalProps {
  meals: Meal[];
}

export default function DailyTotal(props: DailyTotalProps) {
  const { meals } = props;
  return (
    <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
      {meals.map((meal) => (
        <MealTable meal={meal} />
      ))}
    </Stack>
  );
}
