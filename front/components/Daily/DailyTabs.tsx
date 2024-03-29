import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DailyTabItem from "./DailyTabItem";

import DailyTotal from "./DailyTotal";
import { MealType } from "../../src/Models/MealType";
import { useTranslation } from "next-i18next";
import { DateTime } from "luxon";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DailyTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { t } = useTranslation();
  const today = DateTime.now().toISODate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Daily Tabs"
        >
          <Tab label={t("meal.breakfast")} {...a11yProps(0)} />
          <Tab label={t("meal.lunch")} {...a11yProps(1)} />
          <Tab label={t("meal.snack")} {...a11yProps(2)} />
          <Tab label={t("meal.dinner")} {...a11yProps(3)} />
          <Tab label={t("total")} {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DailyTabItem mealType={MealType.Breakfast} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DailyTabItem mealType={MealType.Lunch} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DailyTabItem mealType={MealType.Snack} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DailyTabItem mealType={MealType.Dinner} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DailyTotal date={today} />
      </TabPanel>
    </Box>
  );
}
