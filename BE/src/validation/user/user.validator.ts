import { check } from "express-validator";
const validateUser = (optional: boolean = false) => [
  check("firstName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("FirstName is required")
    .isLength({ min: 1, max: 25 })
    .withMessage("FirstName must be between 1 to 20 char")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("FirstName must be only char")
    .optional(optional),

  check("lastName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("FirstName is required")
    .isLength({ min: 1, max: 25 })
    .withMessage("FirstName must be between 1 to 20 char")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("FirstName must be only char")
    .optional(optional),

  check("description")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 1, max: 150 })
    .withMessage("Description must be between 1 to 150 char")
    .optional(optional),

  check("allowedToShow")
    .isArray()
    .withMessage("allowedToShow is array")
    .trim()
    .notEmpty()
    .withMessage("allowedToShow is required")
    .optional(optional),

  check("profileImage")
    .optional()
    .isURL()
    .withMessage("Invalid profile image URL")
    .optional(optional),

  check("coverImage")
    .optional()
    .isURL()
    .withMessage("Invalid cover image URL")
    .optional(optional),
];

export const validateUserUpdate = validateUser(true);
export const validateUserAdd = validateUser(false);
