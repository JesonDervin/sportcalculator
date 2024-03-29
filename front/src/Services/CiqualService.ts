import ciqual from "../Databases/Ciqual_Table_2020_light.json"
import AvalaibleIngredient from "../Models/AutocompleteFood";
import CiqualFood from "../Models/CiqualFood";
import { v4 as uuidv4 } from "uuid";

// get all foods from ciqual
export const getCiqualFoods = (): CiqualFood[] => {
    const ciqualData = (ciqual as unknown) as CiqualFood[];
    return ciqualData;
}

export const getFoodsForAutocomplete = (locale: string): AvalaibleIngredient[] => {
    const foods = getCiqualFoods();
    // * ciqual api is either in english or french, needs to return manualy name depending on used locale
    if (locale === "en") {
        return foods.map(f => new AvalaibleIngredient(uuidv4(), f.alim_nom_eng, Number(f.proteines_100g), Number(f.glucides_100g), Number(f.lipides_100g)));
    }
    else {
        return foods.map(f => new AvalaibleIngredient(uuidv4(), f.alim_nom_fr, Number(f.proteines_100g), Number(f.glucides_100g), Number(f.lipides_100g)));
    }
}