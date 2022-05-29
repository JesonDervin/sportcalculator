import LocalStorageKeys from "../Models/LocalStorageKeys";
import Recipe from "../Models/Recipe";

export const getLocalStorageRecipes = (): Recipe[] => {
  let result = [] as Recipe[];
  const recipes = localStorage.getItem(LocalStorageKeys.Recipes);
  if (recipes) {
    result = JSON.parse(recipes);
  }
  return result;
};

export const setLocalStorageRecipes = (newRecipes: Recipe[]) => {
  localStorage.setItem(LocalStorageKeys.Recipes, JSON.stringify(newRecipes));
};

export const setLocalStorageRecipesById = (id: string, newRecipe: Recipe) => {
  const recipes = getLocalStorageRecipes();
  const targetRecipe = recipes.filter((r) => r.id === id)[0];
  if (targetRecipe) {
    targetRecipe.name = newRecipe.name;
    targetRecipe.foods = newRecipe.foods;
  } else {
    recipes.push(newRecipe);
  }
  localStorage.setItem(LocalStorageKeys.Recipes, JSON.stringify(recipes));
};