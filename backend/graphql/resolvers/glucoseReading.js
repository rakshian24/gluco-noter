import { ApolloError } from "apollo-server-errors";
import User from "../../models/User.js";
import getLoggedInUserId from "../../middleware/getLoggedInUserId.js";
import GlucoseReading from "../../models/glucoseReadingModel.js";
import Food from "../../models/Food.js";
import moment from "moment";

export default {
  Mutation: {
    async createGlucoseReading(_, args, ctx) {
      const {
        type,
        reading,
        description,
        isMedsTaken,
        isExercised,
        consumedFoods,
      } = args;
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
          "Cannot get the reading for this user as this user does not exist!"
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

    async getAllReadingForDate(_, { date }, ctx) {
      const loggedInUserId = getLoggedInUserId(ctx);
      const userId = loggedInUserId?.userId;

      if (!userId) {
        throw new ApolloError(
          "Cannot get the reading for this user as this user does not exist!"
        );
      }

      const startDate = moment(date, "DD-MM-YYYY").startOf("day").toDate();
      const endDate = moment(date, "DD-MM-YYYY").endOf("day").toDate();

      const user = await User.findById(userId);

      const readings = await GlucoseReading.find({
        user: user._doc._id,
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      })
        .populate("consumedFoods")
        .populate("user");

      return readings;
    },
  },
};
