import * as React from "react";
import { useRouter } from "next/router";

import { AppBar, Toolbar, CssBaseline, Tab, Tabs } from "@mui/material";
import { useTranslation } from "next-i18next";
import { EventAvailable, StickyNote2 } from "@mui/icons-material";
const MainNavBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };
  return (
    <AppBar position="static" color="transparent">
      <CssBaseline />
      <Toolbar>
        <div>
          <Tabs
            value={router.asPath}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab icon={<EventAvailable />} label={t("menu.daily")} value="/" />
            <Tab
              icon={<StickyNote2 />}
              label={t("menu.recipes")}
              value="/Recipes"
            />
          </Tabs>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
