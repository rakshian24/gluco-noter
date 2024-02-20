import jwt from "jsonwebtoken";

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
