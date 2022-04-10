import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DailyTabItem from "./DailyTabItem";
import Meal from "../../Models/Meal";
import Food from "../../Models/Food";
import NutritionalDetails from "../../Models/NutritionalDetails";
import { Typography } from "@mui/material";

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

// Todo having Meal list in props
export default function DailyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const exempleBreakFast = new Meal("BreakFast", [
    new Food("nutella", 40, new NutritionalDetails(1, 20, 78)),
  ]);

  const exempleLunch = new Meal("Lunch", [
    new Food("tapenade", 50, new NutritionalDetails(5, 50, 50)),
  ]);

  const exempleSnack = new Meal("Snack", [
    new Food("skyr", 60, new NutritionalDetails(60, 3, 78)),
  ]);

  const exempleDinner = new Meal("Dinner", [
    new Food("houmouss", 70, new NutritionalDetails(70, 4, 87)),
  ]);

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
        <DailyTabItem item={exempleBreakFast} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DailyTabItem item={exempleLunch} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DailyTabItem item={exempleSnack} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DailyTabItem item={exempleDinner} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Total
      </TabPanel>
    </Box>
  );
}
