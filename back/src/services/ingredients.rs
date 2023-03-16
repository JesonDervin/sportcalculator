use actix_web::{get, web, Responder, Result};
use serde::Deserialize;

use crate::repository::get_ingredients;

#[derive(Deserialize)]
pub struct SearchQuery {
    query: String,
}

#[get("search")]
pub async fn search(search: web::Query<SearchQuery>) -> Result<impl Responder> {
    let query = search.query.clone();
    let ingredients = get_ingredients(query);
    Ok(web::Json(ingredients))
}
