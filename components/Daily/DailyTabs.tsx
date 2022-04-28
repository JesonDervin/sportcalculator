import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DailyTabItem from "./DailyTabItem";

import DailyTotal from "./DailyTotal";
import Meal from "../../src/Models/Meal";
import { MealType } from "../../src/Models/MealType";
import { MealActionType, MealReducer } from "../../src/State/Meal/MealState";
import Food from "../../src/Models/Food";
import { useTranslation } from "next-i18next";

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

interface DailyTabsProps {
  meals: Meal[];
}

export default function DailyTabs(props: DailyTabsProps) {
  const { meals } = props;
  const [currentMeals, dispatch] = React.useReducer(MealReducer, [...meals]);

  const handleDeleteFood = (mealType: MealType, foodIndex: number) => {
    dispatch({
      type: MealActionType.REMOVEFOOD,
      mealType: mealType,
      foodIndex: foodIndex,
    });
  };
  const handleAddFood = (mealType: MealType, food: Food) => {
    dispatch({
      type: MealActionType.ADDFOOD,
      mealType: mealType,
      food: food,
    });
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const breakFast = currentMeals.filter(
    (f) => f.type === MealType.Breakfast
  )[0];
  const lunch = currentMeals.filter((f) => f.type === MealType.Lunch)[0];
  const snack = currentMeals.filter((f) => f.type === MealType.Snack)[0];
  const dinner = currentMeals.filter((f) => f.type === MealType.Dinner)[0];
  const { t } = useTranslation();

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
        <DailyTabItem
          meal={breakFast}
          deleteFood={handleDeleteFood}
          addFood={handleAddFood}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DailyTabItem
          meal={lunch}
          deleteFood={handleDeleteFood}
          addFood={handleAddFood}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DailyTabItem
          meal={snack}
          deleteFood={handleDeleteFood}
          addFood={handleAddFood}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DailyTabItem
          meal={dinner}
          deleteFood={handleDeleteFood}
          addFood={handleAddFood}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DailyTotal meals={currentMeals} />
      </TabPanel>
    </Box>
  );
}
