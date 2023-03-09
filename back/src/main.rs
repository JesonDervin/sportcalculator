use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

use models::food::Food;
use repository::PickleDbRepository;

pub mod models;
pub mod repository;

use models::food::Food;
use repository::{get_database, init_database};
use services::ingredients::search;

use crate::{models::ciqual_food::CiqualFood, repository::DbKeys};

pub mod models;
pub mod repository;
pub mod services;

#[get("/")]
async fn hello() -> impl Responder {
    let db = get_database();

    let db_result = db
        .get::<Vec<CiqualFood>>(DbKeys::Ciqual.as_string())
        .unwrap();

    let response = serde_json::to_string(&db_result).unwrap();
    HttpResponse::Ok().body(response)
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    let mut db = get_database();
    db.set("echo", &req_body.clone()).unwrap();

    HttpResponse::Ok().body(req_body)
}

#[post("/ciqual")]
async fn ciqual(req_body: String) -> impl Responder {
    let ingredients: Vec<CiqualFood> = serde_json::from_str(&req_body).unwrap();

    let mut db = get_database();
    let mut ciqual_list = db.lcreate(DbKeys::Ciqual.as_string()).unwrap();

    for ingredient in &ingredients {
        ciqual_list.ladd(&ingredient);
    }

    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    let food = Food {
        name: "testFood".to_owned(),
        protein: 50.1,
        carbohydrate: 40.0,
        lipid: 30.0,
        quantity: 10,
    };

    HttpResponse::Ok().json(food)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    init_database();

    // Http server starting
    HttpServer::new(|| {
        App::new()
            .app_data(web::PayloadConfig::new(1000000 * 250))
            .service(hello)
            .service(echo)
            .service(ciqual)
            .service(web::scope("/ingredients").service(search))
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
