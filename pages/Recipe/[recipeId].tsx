import * as React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths } from "next";
import RecipeLayout from "../../components/Layout/RecipeLayout";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import RecipeForm from "../../components/Recipe/RecipeForm";

const EditRecipe = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { recipeId: recipeIdQuery } = router.query;
  const recipeId = recipeIdQuery as string;
  return (
    <RecipeLayout>
      <h1>{t("recipe.edit")}</h1>
      <div>
        <RecipeForm recipeToEditId={recipeId} />
      </div>
    </RecipeLayout>
  );
};

export default EditRecipe;
export async function getStaticProps(props: { locale: string }) {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

// * making get recipeId from router avalaible in components
export const getStaticPaths: GetStaticPaths<{
  recipeId: string;
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
