import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Unauthorised - no token provided" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res
        .status(400)
        .json({ success: false, message: "Unauthorised - no token provided" });
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    res.status(400).json({ success: false, message: 'Server error' });
  }
};
