use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Food {
    pub name: String,
    pub protein: f32,
    pub carbohydrate: f32,
    pub lipid: f32,
    pub quantity: u16,
}
