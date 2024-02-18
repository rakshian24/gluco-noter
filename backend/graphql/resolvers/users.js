import { ApolloError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import getLoggedInUserId from "../../middleware/getLoggedInUserId.js";

export default {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { email, username, password, confirmPassword } },
      ctx
    ) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new ApolloError(
          `A user is already registered with the email ${email}`,
          "USER_ALREADY_EXISTS"
        );
      }

      const newUser = new User({ username, email, password, confirmPassword });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const res = await newUser.save();
      
      const response = { user: { ...res._doc }, token };

      return response;
    },

    async loginUser(_, { loginInput: { email, password } }, ctx) {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        const response = { user: { ...user._doc }, token };

        return response;
      } else {
        throw new ApolloError(
          `Invalid email or password`,
          "INVALID_EMAIL_OR_PASSWORD"
        );
      }
    },
  },
  Query: {
    async me(_, args, ctx) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      const user = await User.findById(userId);

      return user;
    },
  },
};
