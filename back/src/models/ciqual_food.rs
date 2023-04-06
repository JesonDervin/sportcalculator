use serde::{Deserialize, Deserializer, Serialize};

// represents ciqual db struct
#[derive(Serialize, Deserialize)]
pub struct CiqualFood {
    #[serde(deserialize_with = "handle_null_int")]
    pub alim_code: i32,
    #[serde(deserialize_with = "handle_null_string")]
    pub alim_nom_fr: String,
    #[serde(deserialize_with = "handle_null_string")]
    pub alim_nom_eng: String,
    #[serde(deserialize_with = "handle_null_float")]
    pub proteines_100g: f32,
    #[serde(deserialize_with = "handle_null_float")]
    pub glucides_100g: f32,
    #[serde(deserialize_with = "handle_null_float")]
    pub lipides_100g: f32,
}

/*all handle_null_* are for deserialization case when a value is not provided in json */
fn handle_null_float<'de, D>(d: D) -> Result<f32, D::Error>
where
    D: Deserializer<'de>,
{
    Deserialize::deserialize(d).map(|x: Option<_>| x.unwrap_or(-1.0))
}

fn handle_null_int<'de, D>(d: D) -> Result<i32, D::Error>
where
    D: Deserializer<'de>,
{
    Deserialize::deserialize(d).map(|x: Option<_>| x.unwrap_or(-1))
}

fn handle_null_string<'de, D>(d: D) -> Result<String, D::Error>
where
    D: Deserializer<'de>,
{
    Deserialize::deserialize(d).map(|x: Option<_>| x.unwrap_or("".to_string()))
}
