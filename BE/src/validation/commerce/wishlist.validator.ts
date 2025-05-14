import { body } from "express-validator";

export const wishlistValidator = [
  body("itemId")
    .notEmpty()
    .withMessage("itemId is required")
    .isMongoId()
    .withMessage("invalid itemId"),
];
