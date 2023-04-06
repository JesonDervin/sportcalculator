use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

use models::{ciqual_food::CiqualFood, food::Food, user::User};
use passwords::hasher;
use repository::core::init_database;
use services::ingredients::search;
use uuid::Uuid;

use crate::repository::{
    core::{get_database, DbKeys},
    users::{get_user_list, set_user_list},
};

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

#[post("/user")]
async fn add_user(req_body: String) -> impl Responder {
    let request_user: User = serde_json::from_str(&req_body).unwrap();
    let salt = hasher::gen_salt();
    let raw_password = request_user.password;
    let password = hasher::bcrypt_format(10, &salt, &raw_password).unwrap();
    let mut user_list: Vec<User> = get_user_list();
    let uuid = Uuid::new_v4();
    let new_user: User = User {
        salt: Some(salt),
        login: "admin".to_owned(),
        password,
        // ! panic if size > u32.max value....but if happend we rich !
        id: Some(uuid),
    };
    user_list.push(new_user);
    set_user_list(user_list.to_vec());
    HttpResponse::Ok().json(user_list)
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
            .service(add_user)
            .service(web::scope("/ingredients").service(search))
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
