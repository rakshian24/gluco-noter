import gql from "graphql-tag";

export const REGISTER_USER_MUTATION = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      token
      user {
        id
        username
        email
        todos {
          id
          title
          description
          isCompleted
          ownerId
        }
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
      user {
        id
        username
        email
        todos {
          id
          title
          description
          isCompleted
          ownerId
        }
      }
    }
  }
`;
