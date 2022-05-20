import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DailyTabs from "./DailyTabs";
import { MealType } from "../../src/Models/MealType";
import Meal from "../../src/Models/Meal";
import { useTranslation } from "next-i18next";
import DailyMeals from "../../src/Models/DailyMeals";

export default function Daily() {
  const { t } = useTranslation();
  const dailyMeals = new DailyMeals(
    new Meal(MealType.Breakfast),
    new Meal(MealType.Lunch),
    new Meal(MealType.Snack),
    new Meal(MealType.Dinner)
  );
  return (
    <Container>
      <Box>{t("daily.title")}</Box>
      <DailyTabs dailyMeals={dailyMeals} />
    </Container>
  );
}
