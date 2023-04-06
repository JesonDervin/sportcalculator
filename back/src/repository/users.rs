use crate::models::user::User;

use super::core::{get_database, DbKeys};

pub fn get_user_list() -> Vec<User> {
    let mut db = get_database();

    if !db.exists(DbKeys::User.as_string()) {
        let new_list: Vec<User> = Vec::new();
        db.set(DbKeys::User.as_string(), &new_list).unwrap();
    }
    db.get(DbKeys::User.as_string()).unwrap()
}

// set user list (replace existing)
pub fn set_user_list(user_list: Vec<User>) {
    let mut db = get_database();
    db.set(DbKeys::User.as_string(), &user_list).unwrap();
}
