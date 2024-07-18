import jwt from "jsonwebtoken";
import * as fs from "fs";

const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.authToken;
    if (!token) {
      return res.json({
        message: "Access Denied",
        data: null,
        statusCode: 403,
      });
    }

    const publicKey = fs.readFileSync("public.key", "utf8");
    const verified = jwt.verify(token, publicKey);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      data: null,
      error,
      statusCode: 500,
    });
  }
};

export { verifyToken };
