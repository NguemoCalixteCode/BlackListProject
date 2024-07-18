import fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkIfUserAlreadyExist = async (username, password) => {
  try {
    return await User.findOne({ username: username, password: password });
  } catch (error) {
    console.log("error :", error);
    return error;
  }
};

const addUser = async (req, res) => {
  const { username, password } = req.body;

  const userAlreadyExist = await checkIfUserAlreadyExist(username, password);
  if (userAlreadyExist) {
    res.json({
      message: "user already exist",
      data: null,
      statusCode: 409,
    });
  } else {
    const newUser = new User({
      username: username,
      password: password,
    });

    return await newUser
      .save()
      .then((response) => {
        res.json({
          message: "user created successfully",
          data: response,
          statusCode: 200,
        });
      })
      .catch((err) => {
        console.log("error :", err);
      });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  return await User.findOne({
    username: username,
    password: password,
  })
    .then((response) => {
      if (response) {
        const privateKey = fs.readFileSync("private.key", "utf-8");
        jwt.sign(
          { id: response?._id },
          privateKey,
          { algorithm: "RS256" },
          (err, token) => {
            res.cookie("authToken", token, {
              maxAge: 5 * 60 * 60 * 1000, // 5 hours in milliseconde
              httpOnly: true,
            });
            res.json({
              message: "Successfull authentication",
              token: token,
              statusCode: 200,
            });
          }
        );
      } else {
        res.json({
          message: "Username or password invalid",
          token: null,
        });
      }
    })
    .catch((err) => {
      return err;
    });
};

const logout = (req, res) => {
  res.clearCookie("authToken");
  res.json({
    message: "Successfull logout",
  });
};

export { addUser, login, logout };
