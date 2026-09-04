import { gql } from "@apollo/client";

export const GET_HEALTHS = gql`
  query healths {
    adminHealth {
      apiStatus
      email
    }
    assetsHealth {
      apiStatus
    }
    billingHealth {
      apiStatus
    }
    estimationHealth {
      apiStatus
    }
    identityHealth {
      apiStatus
    }
    mediaHealth {
      apiStatus
    }
    notificationHealth {
      apiStatus
    }
    workHealth {
      apiStatus
    }
  }
`;
