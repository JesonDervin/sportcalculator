use actix_web::{post, web, HttpResponse};

use crate::models::meal::Meal;
use crate::repository::meals::create_meal;

#[post("meal")]
pub async fn add_meal(new_meal: web::Query<Meal>) -> HttpResponse {
    create_meal(new_meal.0);
    HttpResponse::NoContent().finish()
}
