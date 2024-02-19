import gql from "graphql-tag";

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_FOODS = gql`
  query {
    getAllFoods {
      _id
      label
      value
      createdAt
      updatedAt
    }
  }
`;
