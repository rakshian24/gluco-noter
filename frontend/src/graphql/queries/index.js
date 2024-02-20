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

export const GET_ALL_READINGS = gql`
  query {
    getAllReadingsGroupedByDate {
      _id
      results {
        _id
        consumedFoods {
          _id
          createdAt
          label
          updatedAt
          value
        }
        createdAt
        description
        isExercised
        isMedsTaken
        reading
        type
        updatedAt
        user {
          _id
          email
          username
        }
      }
    }
  }
`;

export const GET_READINGS_FOR_DATE = gql`
  query getAllReadingForDate($date: String!) {
    getAllReadingForDate(date: $date) {
      _id
      consumedFoods {
        _id
        createdAt
        label
        updatedAt
        value
      }
      createdAt
      description
      isExercised
      isMedsTaken
      reading
      type
      updatedAt
      user {
        _id
        email
        username
      }
    }
  }
`;
