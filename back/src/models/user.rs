use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub salt: Option<[u8; 16]>,
    pub password: String,
    pub login: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<Uuid>,
}
