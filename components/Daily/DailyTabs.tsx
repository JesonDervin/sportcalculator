import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DailyTabItem from "./DailyTabItem";

import DailyTotal from "./DailyTotal";
import Meal from "../../Models/Meal";
import { MealType } from "../../Models/MealType";
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const breakFast = meals.filter((f) => f.type === MealType.Breakfast)[0];
  const lunch = meals.filter((f) => f.type === MealType.Lunch)[0];
  const snack = meals.filter((f) => f.type === MealType.Snack)[0];
  const dinner = meals.filter((f) => f.type === MealType.Dinner)[0];

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
          <Tab label="Breakfast" {...a11yProps(0)} />
          <Tab label="Lunch" {...a11yProps(1)} />
          <Tab label="Snack" {...a11yProps(2)} />
          <Tab label="Dinner" {...a11yProps(3)} />
          <Tab label="Total" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DailyTabItem item={breakFast} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DailyTabItem item={lunch} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DailyTabItem item={snack} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DailyTabItem item={dinner} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DailyTotal meals={meals} />
      </TabPanel>
    </Box>
  );
}
