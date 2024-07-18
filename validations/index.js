import { body } from "express-validator";

const validationsPostMessages = [
  body("From")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .withMessage("The From field is required"),
  body("Message")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .withMessage("The Message field"),
];

const validationsUserCreation = [
  body("username")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .withMessage("The username field is required"),
  body("password")
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .withMessage("The password field is required"),
];

export { validationsPostMessages, validationsUserCreation };
