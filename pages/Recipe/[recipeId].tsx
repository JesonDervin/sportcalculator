import * as React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths } from "next";
import RecipeLayout from "../../components/Layout/RecipeLayout";
import { useTranslation } from "next-i18next";
import LocalStorageKeys from "../../src/Models/LocalStorageKeys";
import Recipe from "../../src/Models/Recipe";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import RecipeForm from "../../components/Recipe/RecipeForm";

const EditRecipe = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [storedRecipes] = useLocalStorage<Recipe[]>(
    LocalStorageKeys.Recipes,
    []
  );

  const { recipeId } = router.query;
  // * since storedRecipes are from window object,
  // * we have to use this trick to not make a mismatch
  //* between what is generated server side and what is on client,
  //*  to not make virtual dom confused
  const currentRecipeRef = React.useRef<Recipe>();
  React.useEffect(() => {
    currentRecipeRef.current = storedRecipes.find(
      (recipe: Recipe) => recipe.id === recipeId
    );
  });

  return (
    <RecipeLayout>
      <h1>{t("recipe.edit")}</h1>
      {currentRecipeRef.current ? (
        <div>
          <RecipeForm recipeToEdit={currentRecipeRef.current} />
        </div>
      ) : (
        <div>{t("errors.invalid")}</div>
      )}
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
