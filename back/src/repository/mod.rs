use std::fs::copy;
use std::path::Path;

use pickledb::PickleDb;

use crate::models::ciqual_food::CiqualFood;
use crate::models::food::Food;

pub const DB_PATH: &str = "db/sports.db";
pub const MODEL_PATH: &str = "db/model_sports.db";

pub fn get_foods() -> Vec<Food> {
    panic!("not implemented");
}

pub fn get_database() -> PickleDb {
    return PickleDb::load(
        DB_PATH,
        pickledb::PickleDbDumpPolicy::AutoDump,
        pickledb::SerializationMethod::Json,
    )
    .unwrap();
}

pub fn init_database() {
    let file_exists: bool = Path::new(DB_PATH).exists();
    if !file_exists {
        copy(MODEL_PATH, DB_PATH).expect("Db model should be copyable to DB_PATH");
    }
}

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

pub enum DbKeys {
    Ciqual,
}

impl DbKeys {
    pub fn as_string(&self) -> &'static str {
        match self {
            DbKeys::Ciqual => "Ciqual",
        }
    }
}
