use serde::{Deserialize, Serialize};

#[allow(non_camel_case_types)]
#[derive(Copy, Clone, Eq, PartialEq, Debug, Serialize, Deserialize)]
pub enum StatusType {
    DRAFT,            // Created but not yet submitted for review or approval
    SUBMITTED,        // Submitted for approval/review
    UNDER_REVIEW,     // Actively being reviewed/approved by stakeholders
    APPROVED,         // Approved by all required parties
    REJECTED,         // Rejected during review/approval
    SENT_TO_CUSTOMER, // Sent/issued to customer for feedback or acceptance
    ACCEPTED,         // Customer accepted the quotation
    REVISED,          // Modified (usually after customer or reviewer feedback)
    EXPIRED,          // No longer valid due to expiration date passing
    CANCELLED,        // Cancelled by the issuer or rejected by customer
    WITHDRAWN,        // Pulled back prior to customer review (if allowed in your process)
    ORDERED,          // An order was placed based on this quotation (quote → order workflow)
    CLOSED,           // Business process concluded; quotation archived/locked}
}
