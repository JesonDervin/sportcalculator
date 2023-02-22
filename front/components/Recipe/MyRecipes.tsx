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
import MyRecipesListItem from "./MyRecipesListItem";
import { useRecoilValue } from "recoil";
import { recipesMealState } from "../../src/State/Recipes";

const MyRecipes = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const storedRecipes = useRecoilValue(recipesMealState);
  const [currentRecipes, setCurrentRecipes] = React.useState([] as Recipe[]);
  React.useEffect(() => {
    setCurrentRecipes(storedRecipes);
  }, [storedRecipes]);

  const handleAddRecipe = () => {
    router.push("/AddRecipe", "/Recipes");
  };
  const handleEdit = (id: string) => {
    router.push("/Recipe/[recipeId]", `/Recipe/${id}`);
  };

  return (
    <div>
      <h1>{t("recipe.my")}</h1>
      <List dense={true}>
        {currentRecipes.map((recipe: Recipe, index: number) => (
          <MyRecipesListItem
            recipe={recipe}
            onEdit={() => handleEdit(recipe.id)}
            key={index}
          />
        ))}
        {currentRecipes.length == 0 && (
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
