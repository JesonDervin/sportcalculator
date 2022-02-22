import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CalculatorTable from "../components/Daily/DailyTabs";

export default function Daily() {
  return (
    <Container>
      <Box>Daily Calories</Box>
      <CalculatorTable />
    </Container>
  );
}
