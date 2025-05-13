import { body } from "express-validator";

export const reviewValidator = [
  body("rate").isNumeric().withMessage("Rate must be a number"),

  body("description").isString().withMessage("Description must be a string"),

  body("title")
    .optional()
    .isIn(["bad", "average", "good", "veryGood", "excellent"])
    .withMessage(
      "Title must be one of: bad, average, good, veryGood, excellent"
    ),
];
