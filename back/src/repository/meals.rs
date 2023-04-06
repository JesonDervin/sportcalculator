use super::core::{get_database, DbKeys};
use crate::models::meal::Meal;

pub fn create_meal(new_meal: Meal) {
    let mut db = get_database();
}
