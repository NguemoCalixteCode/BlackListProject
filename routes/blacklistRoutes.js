import express from "express";
import {
  blacklistANumber,
  getAllBlacklistedNumbers,
  checkIfNumberIsBlacklisted,
} from "../controllers/blacklist.js";
import { verifyToken } from "../middlewares/auth.js";
import { validationsPostMessages } from "../validations/index.js";

const blacklistRoute = express.Router();

blacklistRoute.post(
  "/",
  validationsPostMessages,
  verifyToken,
  blacklistANumber
);

blacklistRoute.get(
  "/allBlacklistedNumbers",
  verifyToken,
  getAllBlacklistedNumbers
);

blacklistRoute.get(
  "/checkIfNumberIsBlacklisted/:id",
  verifyToken,
  checkIfNumberIsBlacklisted
);

export default blacklistRoute;
