import jwt from "jsonwebtoken";

export const gerateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // csrf
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  return token
};
