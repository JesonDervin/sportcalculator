import { NextRouter } from "next/router";

export function getRouterPage(router: NextRouter) {
  // * asPath returns <page>/...
  // * taking page
  const page = router.asPath.split("/")[1];
  if (page === "") {
    return "/";
  }
  if (page.includes("Recipe")) {
    return "/Recipes";
  }
}
