use serde::{Deserialize, Serialize};

#[allow(non_camel_case_types)]
#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum Currency {
    USD,
    EUR,
    GBP,
    JPY,
    AUD,
    CAD,
    CHF,
    CNY,
    SEK,
    NZD,
    INR,
}

impl Currency {
    pub fn to_string(&self) -> &str {
        match self {
            Currency::USD => "USD",
            Currency::EUR => "EUR",
            Currency::GBP => "GBP",
            Currency::JPY => "JPY",
            Currency::AUD => "AUD",
            Currency::CAD => "CAD",
            Currency::CHF => "CHF",
            Currency::CNY => "CNY",
            Currency::SEK => "SEK",
            Currency::NZD => "NZD",
            Currency::INR => "INR",
        }
    }
}
