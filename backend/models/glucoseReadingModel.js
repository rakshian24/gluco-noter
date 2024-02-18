import { ApolloError } from "apollo-server-errors";
import mongoose from "mongoose";

const typeForMakingConsumedFoodsRequired = ["AB", "AL", "AD"];

const Schema = mongoose.Schema;

const glucoseReadingSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Please select the type!"],
      enum: ["BB", "AB", "BL", "AL", "BD", "AD"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reading: {
      type: Number,
      required: [true, "Reading is required!"],
      min: [51, "Reading must be greater than 50"],
      max: [400, "Exceeding the reading limit(400)"],
      validate: {
        validator: function (readingValue) {
          // Below regex is for allowing only positive non decimal numbers with null value
          if (!/^(?!0+(?:\0+)?)\d*(?:\d+)?$/.test(readingValue)) {
            throw new ApolloError("Special characters are not allowed", 400);
          }
        },
      },
    },
    isMedsTaken: {
      type: Boolean,
      required: [true, "Have you not taken your pills yet?"],
    },
    isExercised: {
      type: Boolean,
      required: [true, "Did you excercise today?"],
    },
    consumedFoods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
        validate: {
          validator: function (consumedFoodsVal) {
            if (typeForMakingConsumedFoodsRequired.includes(this.type)) {
              if (consumedFoodsVal) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          },
          message: "Please provide the food consumed!",
        },
      },
    ],

    description: {
      type: String,
      maxLength: [250, "Description is longer than the max length(250)"],
    },
  },
  {
    timestamps: true,
  }
);

const GlucoseReading = mongoose.model("GlucoseReading", glucoseReadingSchema);

export default GlucoseReading;
