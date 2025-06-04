// user Authorization
import dotenv from "dotenv";
dotenv.config();

import * as JWT from "jsonwebtoken";
import { ERROR, SUCCESS, FAIL } from "../utils/http-status.js";
const VerifyUser = (req, res, next) => {
  const token = req.headers("Authorization") || req.headers("authorization");
  if (!token) {
    res
      .satatus(402)
      .json({ status: ERROR, data: { title: "Token is required" } });
  }
  const reqToken = token.split(" ")[1];
  try {
    const decodeToken = JWT.verify(reqToken, process.env.JWT_TOKEN);
    decodeToken = req.decodeToken;
    next();
  } catch (error) {
    res
      .satatus(402)
      .json({ status: ERROR, data: { title: "Unothorized Token" } });
  }
};
export default VerifyUser;
