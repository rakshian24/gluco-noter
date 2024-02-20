import gql from "graphql-tag";

export const REGISTER_USER_MUTATION = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const CREATE_FOOD_MUTATION = gql`
  mutation Mutation($foodInput: FoodInput) {
    createFood(foodInput: $foodInput) {
      _id
      value
      label
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_READING = gql`
  mutation CreateReading(
    $type: GlucoseReadingType!
    $reading: Int!
    $isMedsTaken: Boolean!
    $isExercised: Boolean!
    $description: String
    $consumedFoods: ID!
    $insulinUnits: Int!
  ) {
    createGlucoseReading(
      type: $type
      reading: $reading
      isMedsTaken: $isMedsTaken
      isExercised: $isExercised
      description: $description
      consumedFoods: $consumedFoods
      insulinUnits: $insulinUnits
    ) {
      _id
      reading
      type
      description
      isMedsTaken
      isExercised
      insulinUnits
      user {
        _id
        username
        email
      }
      consumedFoods {
        _id
        label
        value
      }
      createdAt
      updatedAt
    }
  }
`;
