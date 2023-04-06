use std::fs::copy;
use std::path::Path;

use pickledb::PickleDb;

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

pub enum DbKeys {
    Ciqual,
    User,
}

impl DbKeys {
    pub fn as_string(&self) -> &'static str {
        match self {
            DbKeys::Ciqual => "Ciqual",
            DbKeys::User => "User",
        }
    }
}

pub const DB_PATH: &str = "db/sports.db";
pub const MODEL_PATH: &str = "db/model_sports.db";
