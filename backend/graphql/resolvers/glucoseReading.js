import { ApolloError } from "apollo-server-errors";
import User from "../../models/User.js";
import getLoggedInUserId from "../../middleware/getLoggedInUserId.js";
import GlucoseReading from "../../models/glucoseReadingModel.js";
import Food from "../../models/Food.js";

export default {
  Mutation: {
    async createGlucoseReading(
      _,
      {
        glucoseReadingInput: {
          type,
          reading,
          description,
          isMedsTaken,
          isExercised,
          consumedFoods,
        },
      },
      ctx
    ) {
      const parsedConsumedFoodIds = JSON.parse(consumedFoods);
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError(
          "Cannot create reading for this user as this user does not exist!"
        );
      }

      const newReading = new GlucoseReading({
        type,
        reading,
        description,
        isExercised,
        isMedsTaken,
        consumedFoods: parsedConsumedFoodIds,
        user: userId,
      });

      const res = await newReading.save();

      const user = await User.findById(userId);
      const userRes = { id: user.id, ...user._doc };

      const foods = await Food.find({
        _id: {
          $in: [...newReading.consumedFoods],
        },
      });

      const response = {
        id: res._id,
        ...res._doc,
        ...{ user: userRes },
        ...{ consumedFoods: foods },
      };
      return response;
    },
  },
  Query: {
    async me(_, args, ctx) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      const user = await User.findById(userId);

      const result = {
        ...user._doc,
        id: user._id,
      };

      return result;
    },
  },
};
