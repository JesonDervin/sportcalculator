import { IconButton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

const MyRecipes = () => {
  const { t } = useTranslation();
  const router = useRouter();

  function handleAddRecipe() {
    router.push("/AddRecipe", "/Recipes");
  }
  return (
    <div>
      <h1>{t("recipe.my")}</h1>
      <IconButton
        color="primary"
        aria-label="add ingredient"
        component="span"
        onClick={handleAddRecipe}
        size="large"
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default MyRecipes;
