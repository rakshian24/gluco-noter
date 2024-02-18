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

      const foods = await Food.find({
        _id: {
          $in: [...newReading.consumedFoods],
        },
      });

      const response = {
        ...res._doc,
        ...{ user },
        ...{ consumedFoods: foods },
      };
      return response;
    },
  },
  Query: {
    async getAllReadingsGroupedByDate(_, args, ctx) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError(
          "Cannot create reading for this user as this user does not exist!"
        );
      }

      const user = await User.findById(userId);

      const readings = await GlucoseReading.aggregate([
        {
          $match: {
            user: user._doc._id,
          },
        },
        {
          $lookup: {
            from: "foods",
            localField: "consumedFoods",
            foreignField: "_id",
            as: "consumedFoods",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$createdAt",
              },
            },
            results: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      return readings;
    },
  },
};
