import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query UserQuery {
    users {
        nodes {
          id
          name
          email
          firstName
          lastName
          isRestricted
        }
      }
  }
`;
