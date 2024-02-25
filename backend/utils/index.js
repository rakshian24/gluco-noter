import jwt from "jsonwebtoken";
import moment from "moment";

export const generateToken = async (user) => {
  return new Promise((res) => {
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res(token);
  });
};

export const getFormattedTimeStamp = (value) => {
  return moment(value).format("hh:mm A");
};

export const subtractTime = (inputTimeString, timeFormat, hoursToSubtract) => {
  const inputMoment = moment(inputTimeString, timeFormat);
  const outputMoment = inputMoment.subtract(hoursToSubtract, "hours");
  return outputMoment.format(timeFormat);
};
