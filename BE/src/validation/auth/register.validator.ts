import { check } from "express-validator";

export const registerValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .matches(
      /^[a-zA-Z0-9._-]+@(gmail|yahoo|outlook|hotmail|icloud|example)\.com$/
    )
    .withMessage("Email provider not supported"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 10 characters long, contain at least two uppercase letters, two lowercase letters, two numbers, and two symbols."
  ),
  
  check("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("phoneNumber")
    .optional({ checkFalsy: true })
    .trim()
    .customSanitizer((val) => val.replace(/[\s\-()]/g, ""))
    .matches(/^\+[1-9]\d{10,15}$/)
    .withMessage(
      "Phone number must be in E.164 format and at least 10 digits long"
    ),

  check("firstName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("FirstName is required")
    .isLength({ min: 1, max: 25 })
    .withMessage("FirstName must be between 1 to 20 char")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("FirstName must be only char"),

  check("lastName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("FirstName is required")
    .isLength({ min: 1, max: 25 })
    .withMessage("FirstName must be between 1 to 20 char")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("FirstName must be only char"),

  check("gender")
    .optional()
    .isString()
    .trim()
    .isIn(["male", "female", ""])
    .withMessage("Account type must be male or female or empty"),

  check("accountType")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Account type is required")
    .isIn(["business", "personal"])
    .withMessage("Account type must be business or personal"),

  check("terms")
    .trim()
    .notEmpty()
    .withMessage("Terms is required")
    .isBoolean()
    .toBoolean(),
];
