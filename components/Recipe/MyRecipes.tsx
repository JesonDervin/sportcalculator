import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import * as React from "react";
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
  const currentRecipes = React.useRef([] as Recipe[]);
  React.useEffect(() => {
    currentRecipes.current = [...storedRecipes];
  }, [storedRecipes]);
  function handleAddRecipe() {
    router.push("/AddRecipe", "/Recipes");
  }
  function handleEdit(id: string) {
    router.push("/Recipe/[recipeId]", `/Recipe/${id}`);
  }
  return (
    <div>
      <h1>{t("recipe.my")}</h1>
      <List dense={true}>
        {currentRecipes.current.map((recipe: Recipe, index: number) => (
          <MyRecipesListItem
            recipe={recipe}
            onEdit={() => handleEdit(recipe.id)}
            key={index}
          />
        ))}
        {currentRecipes.current.length == 0 && (
          <ListItem key="norecipe" component="li">
            <ListItemText>{t("recipe.empty")}</ListItemText>
          </ListItem>
        )}
        <ListItemButton component="li">
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
