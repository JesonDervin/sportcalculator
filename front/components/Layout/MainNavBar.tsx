import * as React from "react";
import { useRouter } from "next/router";

import { AppBar, Toolbar, CssBaseline, Tab, Tabs } from "@mui/material";
import { useTranslation } from "next-i18next";
import { EventAvailable, StickyNote2, Check } from "@mui/icons-material";
import { getRouterPage } from "../../src/Helpers/RouterHelper";

const MainNavBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };
  const currentPage = getRouterPage(router);
  return (
    <AppBar position="static" color="transparent">
      <CssBaseline />
      <Toolbar>
        <div>
          <Tabs
            value={currentPage}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab icon={<Check />} label={t("menu.daily")} value="/" />
            <Tab
              icon={<StickyNote2 />}
              label={t("menu.recipes")}
              value="/Recipes"
            />
            <Tab
              icon={<EventAvailable />}
              label={t("menu.followUp")}
              value="/FollowUp"
            />
          </Tabs>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
