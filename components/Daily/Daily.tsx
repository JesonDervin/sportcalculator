import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DailyTabs from "./DailyTabs";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";
import { todayDailyMealState } from "../../src/State/DailyMeal";

export default function Daily() {
  const { t } = useTranslation();
  const dailyMeals = useRecoilValue(todayDailyMealState);
  return (
    <Container>
      <Box>{t("daily.title")}</Box>
      <DailyTabs dailyMeals={dailyMeals} />
    </Container>
  );
}
