import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DailyTabs from "../components/Daily/DailyTabs";
import { MealType } from "../Models/MealType";
import Meal from "../Models/Meal";
import Food from "../Models/Food";

// TODO : having this list retrieved with stored data
const exampleBreakFast = new Meal(MealType.Breakfast, [
  new Food("nutella", 40, 1, 20, 78),
]);

const exampleLunch = new Meal(MealType.Lunch, [
  new Food("tapenade", 50, 5, 50, 50),
]);

const exampleSnack = new Meal(MealType.Snack, [
  new Food("skyr", 60, 60, 3, 78),
]);

const exampleDinner = new Meal(MealType.Dinner, [
  new Food("houmouss", 70, 70, 4, 87),
]);

const dailyMeal = [exampleBreakFast, exampleLunch, exampleSnack, exampleDinner];

export default function Daily() {
  return (
    <Container>
      <Box>Daily Calories</Box>
      <DailyTabs meals={dailyMeal} />
    </Container>
  );
}
