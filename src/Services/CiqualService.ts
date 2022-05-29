import ciqual from "../Databases/Ciqual_Table_2020_light.json"
import AutocompleteFood from "../Models/AutocompleteFood";
import CiqualFood from "../Models/CiqualFood";
import { v4 as uuidv4 } from "uuid";

// get all foods from ciqual
export const getCiqualFoods = (): CiqualFood[] => {
    const ciqualData = (ciqual as unknown) as CiqualFood[];
    return ciqualData;
}

export const getFoodsForAutocomplete = (locale: string): AutocompleteFood[] => {
    const foods = getCiqualFoods();
    // * ciqual api is either in english or french, needs to return manualy name depending on used locale
    if (locale === "en") {
        return foods.map(f => new AutocompleteFood(uuidv4(), f.alim_nom_eng, f.proteines_100g, f.glucides_100g, f.lipides_100g));
    }
    else {
        return foods.map(f => new AutocompleteFood(uuidv4(), f.alim_nom_fr, f.proteines_100g, f.glucides_100g, f.lipides_100g));
    }
}