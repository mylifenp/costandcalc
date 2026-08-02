// ...existing code...
use chrono::{DateTime, Utc};
use async_graphql::{InputValueError, InputValueResult, Scalar, ScalarType, Value};
use mongodb::bson;
use serde::{Deserialize, Serialize};

/// Convert bson::DateTime to chrono::DateTime<Utc>
pub fn bson_to_chrono(dt: bson::DateTime) -> DateTime<Utc> {
    DateTime::from_timestamp_millis(dt.timestamp_millis()).unwrap_or_else(|| DateTime::UNIX_EPOCH)
}

/// Custom DateTime scalar that always outputs ISO 8601 with Z suffix
#[derive(Clone, Serialize, Deserialize)]
pub struct DateTimeZ(pub DateTime<Utc>);

#[Scalar]
impl ScalarType for DateTimeZ {
    fn parse(_value: Value) -> InputValueResult<Self> {
        // For input parsing, reuse chrono's parser
        match _value {
            Value::String(s) => {
                let dt = s
                    .parse::<DateTime<Utc>>()
                    .map_err(|e| InputValueError::custom(e.to_string()))?;
                Ok(DateTimeZ(dt))
            }
            _ => Err(InputValueError::expected_type(_value)),
        }
    }

    fn to_value(&self) -> Value {
        Value::String(self.0.to_rfc3339_opts(chrono::SecondsFormat::Millis, true))
    }
}

impl From<bson::DateTime> for DateTimeZ {
    fn from(dt: bson::DateTime) -> Self {
        DateTimeZ(bson_to_chrono(dt))
    }
}

impl From<DateTimeZ> for chrono::DateTime<Utc> {
    fn from(z: DateTimeZ) -> Self {
        z.0
    }
}

impl From<&DateTimeZ> for bson::DateTime {
    fn from(z: &DateTimeZ) -> Self {
        bson::DateTime::from_millis(z.0.timestamp_millis())
    }
}
