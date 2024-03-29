import { selectorFamily } from "recoil";
import AvalaibleIngredient from "../../Models/AutocompleteFood";
import { getFoodsForAutocomplete } from "../../Services/CiqualService";
import { recipesMealState } from "../Recipes";

export const avalaibleIngredientsState = selectorFamily({
    key: "avalaibleIngredientsState",
    get: (locale: string) => ({ get }) => {
        const recipes = get(recipesMealState);
        const recipesMapped = recipes.map(r => new AvalaibleIngredient(r.id, r.name, r.proteinPerQuantity(), r.carbohydratePerQuantity(), r.lipidPerQuantity(), true));
        const apiFoods = getFoodsForAutocomplete(locale);
        const result = recipesMapped.concat(apiFoods);
        const sorted = result.sort((a, b) => {
            // * sort by recipe then by name
            if (a.isRecipe === b.isRecipe) {
                return a.name >= b.name ? 1 : -1;
            }
            return a.isRecipe ? -1 : 1;
        });
        return sorted;
    }
});