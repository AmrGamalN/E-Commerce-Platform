import { check } from "express-validator";

export const validateUserSecurityUpdate = [
  check("phoneNumber")
    .trim()
    .matches(/^[+]?[\d\s\-()]{7,20}$/)
    .withMessage("Invalid phone number format")
    .optional(),
];

export const validateSecurityStatus = [
  check("userId")
    .trim()
    .notEmpty()
    .withMessage("User id is required")
    .matches(/^[a-zA-Z0-9]{28}$/)
    .withMessage("Invalid user id"),

  check("block")
    .trim()
    .isBoolean()
    .withMessage("isAccountBlocked failed must be boolean")
    .toBoolean()
    .optional(),

  check("delete")
    .trim()
    .isBoolean()
    .withMessage("isAccountDeleted failed must be boolean")
    .toBoolean()
    .optional(),
];

export const validateSecurityEmail = [
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
];

export const validateSecurityUpdatePass = [
  check("password")
    .trim()
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
];

export const validateCode2AF = [
  check("twoFactorCode")
    .trim()
    .isInt()
    .withMessage("INVALID OTP NUMBER")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP MUST BE 6 DIGITS."),
];
