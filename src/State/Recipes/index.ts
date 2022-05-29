import { atom, selectorFamily } from "recoil";
import Recipe from "../../Models/Recipe";
import {
  getLocalStorageRecipes,
  setLocalStorageRecipes,
} from "../../Services/RecipesService";
import { v4 as uuidv4 } from "uuid";

export const recipesMealState = atom({
  key: "recipesMealState",
  default: [] as Recipe[],
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window !== "undefined") {
        setSelf(getLocalStorageRecipes());

        onSet((newValue) => {
          setLocalStorageRecipes(newValue);
        });
      }
    },
  ],
});

export const recipeStateById = selectorFamily<Recipe | undefined, string>({
  key: "recipeStateById",
  get:
    (id: string) =>
    ({ get }) => {
      const recipes = get(recipesMealState);
      const recipeById = recipes.filter((f) => f.id === id)[0];
      return recipeById ?? new Recipe("", uuidv4());
    },
  set:
    (id: string) =>
    ({ get, set }, newValue) => {
      const newRecipe = newValue as Recipe;
      const storedRecipes = [...get(recipesMealState)];
      const newRecipeIndex = storedRecipes.findIndex((r) => r.id === id);
      if (newValue) {
        if (newRecipeIndex > -1) {
          storedRecipes[newRecipeIndex] = new Recipe(
            newRecipe.name,
            newRecipe.id,
            newRecipe.foods
          );
        } else {
          storedRecipes.push(newRecipe);
        }
      } else {
        storedRecipes.splice(newRecipeIndex, 1);
      }
      set(recipesMealState, storedRecipes);
    },
});
