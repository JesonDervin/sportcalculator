import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddRecipeForm from "../components/Recipe/AddRecipeForm";
import React from "react";
import { useTranslation } from "next-i18next";
import RecipeLayout from "../components/Layout/RecipeLayout";

const AddRecipe = () => {
  const { t } = useTranslation();

  return (
    <RecipeLayout>
      <h1>{t("recipe.add")}</h1>
      <AddRecipeForm />
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
