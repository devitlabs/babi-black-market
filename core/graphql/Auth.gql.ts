
import { gql } from "@apollo/client";


export const LOGIN_USER_MUTATION = gql`
mutation Login($password: String = "", $username: String = "") {
  login(input: {password: $password, username: $username}) {

    authToken
    clientMutationId
    refreshToken
    sessionToken
    customer {
      displayName
      email
      firstName
      lastName
      orders {
        nodes {
          orderNumber
          status
          total
          date
          currency
        }
      }
      id
      jwtAuthExpiration
      jwtAuthToken
      jwtRefreshToken
      jwtUserSecret
    }
    user {
      avatar {
        url
      }
    }

  }
}
`

export const REGISTER_USER_MUTATION = gql`
mutation registerCustomer($password: String = "", $username: String = "", $displayName: String = "", $firstName: String = "", $email: String = "", $lastName: String = "") {
  registerCustomer(
    input: {lastName: $lastName, displayName: $displayName, email: $email, firstName: $firstName, password: $password, username: $username}
  ) {
    refreshToken
    authToken
    customer {
      firstName
      id
      lastName
      email
      jwtAuthToken
      jwtAuthExpiration
      jwtUserSecret
      jwtRefreshToken
      sessionToken
      username
    
    }
  }
}
`;




export const PASSWORD_RESET_MUTATION = gql`
mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: {username: $username}) {
      success
      clientMutationId
    }
  }

`;




export const LOAD_USER_MUTATION = gql`
mutation sendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: {username: $username}) {
      success
      clientMutationId
    }
  }

`;
