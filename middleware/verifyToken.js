import dotenv from "dotenv";
dotenv.config();

import JWT from "jsonwebtoken";
import { ERROR } from "../utils/http-status.js";

const VerifyUser = (req, res, next) => {
  const token =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!token) {
    return res.status(401).json({
      status: ERROR,
      data: { title: "Token is required" },
    });
  }

  const reqToken = token.split('"')[1]; // removes "Bearer"
  // console.log("token: ", reqToken)
  try {
    console.log("JWt, ", JWT.verify(reqToken, process.env.JWT_TOKEN))
    const decodeToken = JWT.verify(reqToken, process.env.JWT_TOKEN);
    req.decodeToken = decodeToken;
    next();
  } catch (error) {
    return res.status(401).json({
      status: ERROR,
      data: { title: "Unauthorized Token" },
    });
  }
};

export default VerifyUser;
