import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import Recipe from "../../src/Models/Recipe";
import LocalStorageKeys from "../../src/Models/LocalStorageKeys";
import { useLocalStorage } from "usehooks-ts";
import MyRecipesListItem from "./MyRecipesListItem";

const MyRecipes = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [storedRecipes] = useLocalStorage<Recipe[]>(
    LocalStorageKeys.Recipes,
    []
  );

  function handleAddRecipe() {
    router.push("/AddRecipe", "/Recipes");
  }
  return (
    <div>
      <h1>{t("recipe.my")}</h1>
      <List dense={true}>
        {storedRecipes.map((recipe: Recipe, index: number) => (
          <MyRecipesListItem recipe={recipe} key={index} />
        ))}
        {storedRecipes.length == 0 && (
          <ListItem>
            <ListItemText>{t("recipe.empty")}</ListItemText>
          </ListItem>
        )}
        <ListItemButton>
          <IconButton
            edge="start"
            color="primary"
            aria-label="add ingredient"
            component="span"
            onClick={handleAddRecipe}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </ListItemButton>
      </List>
    </div>
  );
};

export default MyRecipes;
