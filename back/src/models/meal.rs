use super::food::Food;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone)]
pub struct Meal {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<Uuid>,
    pub meal_type: MealType,
    pub foods: Vec<Food>,
    pub user_id: Uuid,
}

#[derive(Serialize, Deserialize, Clone)]
pub enum MealType {
    Breakfast,
    Lunch,
    Snack,
    Dinner,
}

impl MealType {
    fn as_string(&self) -> &'static str {
        match self {
            MealType::Breakfast => "Breakfast",
            MealType::Lunch => "Lunch",
            MealType::Snack => "Snack",
            MealType::Dinner => "Dinner",
        }
    }
}
