import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DailyTabItem from "./DailyTabItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DailyTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <DailyTabItem item={"Breakfast"} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DailyTabItem item={"Lunch"} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DailyTabItem item={"Snack"} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DailyTabItem item={"Dinner"} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Total
      </TabPanel>
    </Box>
  );
}
