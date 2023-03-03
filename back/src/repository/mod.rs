use std::path::Path;

use pickledb::PickleDb;

use crate::models::food::Food;

pub struct PickleDbRepository {}

impl PickleDbRepository {
    const DB_PATH: &str = "db/sports.db";
    pub fn get_foods(&self) -> Vec<Food> {
        panic!("not implemented");
    }

    pub fn get_or_create_database(&self) -> PickleDb {
        let file_exists: bool = Path::new(PickleDbRepository::DB_PATH).exists();
        if !file_exists {
            return PickleDb::new(
                PickleDbRepository::DB_PATH,
                pickledb::PickleDbDumpPolicy::AutoDump,
                pickledb::SerializationMethod::Json,
            );
        } else {
            return PickleDb::load(
                PickleDbRepository::DB_PATH,
                pickledb::PickleDbDumpPolicy::AutoDump,
                pickledb::SerializationMethod::Json,
            )
            .unwrap();
        }
    }
}
