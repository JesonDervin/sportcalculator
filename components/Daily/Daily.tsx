import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DailyTabs from "./DailyTabs";
import { MealType } from "../../src/Models/MealType";
import Meal from "../../src/Models/Meal";
import Food from "../../src/Models/Food";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation();
  return (
    <Container>
      <Box>{t("daily.title")}</Box>
      <DailyTabs meals={dailyMeal} />
    </Container>
  );
}
