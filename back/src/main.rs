use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

use models::food::Food;
use repository::PickleDbRepository;

pub mod models;
pub mod repository;

#[get("/")]
async fn hello() -> impl Responder {
    let repository = PickleDbRepository {};
    let db = repository.get_or_create_database();

    let response = db.get::<String>("echo").unwrap();
    HttpResponse::Ok().body(response)
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    let repository = PickleDbRepository {};

    let mut db = repository.get_or_create_database();

    db.set("echo", &req_body.clone()).unwrap();

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
    // Http server starting
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
