use super::core::{get_database, DbKeys};
use crate::models::ciqual_food::CiqualFood;

pub fn get_ingredients(query: String) -> Vec<CiqualFood> {
    let mut matching_ingredients: Vec<CiqualFood> = Vec::new();
    for iter_item in get_database().liter(DbKeys::Ciqual.as_string()) {
        let item = iter_item.get_item::<CiqualFood>().unwrap();

        if item.alim_nom_eng.contains(&query) || item.alim_nom_fr.contains(&query) {
            matching_ingredients.push(item);
        }
    }
    return matching_ingredients;
}
