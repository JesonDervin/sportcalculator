use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use pickledb::PickleDb;
use std::path::Path;

static DB_PATH: &str = "db/sports.db";

#[get("/")]
async fn hello() -> impl Responder {
    // todo having a repository that manage that
    let db = PickleDb::load(
        DB_PATH,
        pickledb::PickleDbDumpPolicy::AutoDump,
        pickledb::SerializationMethod::Json,
    )
    .unwrap();

    let response = db.get::<String>("echo").unwrap();
    HttpResponse::Ok().body(response)
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    // todo having a repository that manage that
    let mut db = PickleDb::load(
        DB_PATH,
        pickledb::PickleDbDumpPolicy::AutoDump,
        pickledb::SerializationMethod::Json,
    )
    .unwrap();

    db.set("echo", &req_body.clone()).unwrap();

    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Setting up DB
    let file_exists: bool = Path::new(DB_PATH).exists();

    if !file_exists {
        PickleDb::new(
            DB_PATH,
            pickledb::PickleDbDumpPolicy::AutoDump,
            pickledb::SerializationMethod::Json,
        );
    }

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
