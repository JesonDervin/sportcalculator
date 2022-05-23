import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DailyTabs from "./DailyTabs";
import { useTranslation } from "next-i18next";

export default function Daily() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box>{t("daily.title")}</Box>
      <DailyTabs />
    </Container>
  );
}
