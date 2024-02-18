export const typeDefs = `

  scalar DateTime

  type User {
    id: ID
    username: String
    email: String
  }

  type AuthResponse {
    user: User
    token: String
  }

  enum GlucoseReadingType {
    BB
    AB
    BL
    AL
    BD
    AD
  }

  type Food {
    id: ID
    value: String
    label: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GlucoseReading {
    id: ID
    type: GlucoseReadingType!
    user: User!
    reading: Int!
    isMedsTaken: Boolean!
    isExercised: Boolean!
    consumedFoods: [Food]!
    description: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  
  input LoginInput {
    email: String!
    password: String!
  }

  input FoodInput {
    value: String!
    label: String!
  }

  input GlucoseReadingInput {
    type: GlucoseReadingType!
    reading: Int!
    isMedsTaken: Boolean!
    isExercised: Boolean!
    description: String
    consumedFoods: ID!
  }

  type GlucoseReadingsGroupedByDate {
    _id: String
    results: [GlucoseReading]
  }
  
  type Query {
    me: User
    getAllFoods: [Food]
    getAllReadingsGroupedByDate: [GlucoseReadingsGroupedByDate]
  }
  
  type Mutation {
    registerUser(registerInput: RegisterInput): AuthResponse
    loginUser(loginInput: LoginInput): AuthResponse

    createFood(foodInput: FoodInput): Food
    createGlucoseReading(glucoseReadingInput: GlucoseReadingInput): GlucoseReading
  }
`;
