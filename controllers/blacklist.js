import Blacklist from "../models/blacklistModel.js";

const getAllBlacklistedNumbers = async (req, res) => {
  return await Blacklist.find()
    .then((response) => {
      res.json({
        data: response,
        message: "list of all blacklisted numbers",
      });
    })
    .catch((err) => {
      console.log("err:", err);
      return err;
    });
};

const checkIfNumberIsBlacklisted = async (req, res) => {
  return await Blacklist.findOne({ phoneNumber: req.params.id })
    .then((response) => {
      if (response?._id) {
        res.json({
          data: true,
          message: "this number is blacklisted",
        });
      } else {
        res.json({
          data: false,
          message: "this number is not blacklisted",
        });
      }
    })
    .catch((err) => {
      console.log("err:", err);
      return err;
    });
};

const numberAlreadyBlacklisted = async (phone) => {
  try {
    return await Blacklist.findOne({ phoneNumber: phone }).exec();
  } catch (error) {
    console.log("error:", error);
    return error;
  }
};

const blacklistANumber = async (req, res) => {
  const { From, Message } = req.body;

  if (Message?.toLocaleUpperCase()?.includes("STOP")) {
    if (await numberAlreadyBlacklisted(From)) {
      res.json({
        message: "Number already blacklisted",
        data: null,
        statusCode: 409,
      });
    } else {
      const newNumber = new Blacklist({
        phoneNumber: From,
      });
      return await newNumber
        .save()
        .then((response) => {
          res.json({
            message: "blacklist number with success",
            data: response,
            statusCode: 200,
          });
        })
        .catch((err) => {
          console.log("error :", err);
        });
    }
  } else {
    res.json({
      message: "no unsubscribe notification detected",
      data: null,
      statusCode: 200,
    });
  }
};

export {
  blacklistANumber,
  getAllBlacklistedNumbers,
  checkIfNumberIsBlacklisted,
};
