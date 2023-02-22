import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RecipeForm from "../components/Recipe/RecipeForm";
import React from "react";
import { useTranslation } from "next-i18next";
import RecipeLayout from "../components/Layout/RecipeLayout";
import { Box } from "@mui/system";

const AddRecipe = () => {
  const { t } = useTranslation();

  return (
    <RecipeLayout>
      <Box sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <h1>{t("recipe.add")}</h1>
        <RecipeForm />
      </Box>
    </RecipeLayout>
  );
};
export default AddRecipe;
export async function getStaticProps(props: { locale: string }) {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
