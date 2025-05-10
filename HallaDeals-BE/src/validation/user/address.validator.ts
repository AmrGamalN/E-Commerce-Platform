import { body } from "express-validator";

export const validateAddress = (isOptional: boolean) => {
  const optionalIf = (field: string) =>
    isOptional ? body(field).optional({ nullable: true }).bail() : body(field);

  return [
    optionalIf("street")
      .notEmpty()
      .withMessage("Street is required")
      .bail()
      .isString()
      .withMessage("Street must be a string"),

    optionalIf("suite")
      .notEmpty()
      .withMessage("Suite is required")
      .bail()
      .isString()
      .withMessage("Suite must be a string"),

    body("houseNumber")
      .optional({ nullable: true })
      .bail()
      .isNumeric()
      .withMessage("House number must be a number")
      .toInt(),

    optionalIf("city")
      .notEmpty()
      .withMessage("City is required")
      .bail()
      .isString()
      .withMessage("City must be a string"),

    optionalIf("governorate")
      .notEmpty()
      .withMessage("Governorate is required")
      .bail()
      .isString()
      .withMessage("Governorate must be a string"),

    optionalIf("country")
      .notEmpty()
      .withMessage("Country is required")
      .bail()
      .isString()
      .withMessage("Country must be a string"),

    body("type")
      .optional({ nullable: true })
      .bail()
      .isString()
      .withMessage("Type must be a string"),

    body("isDefault")
      .optional({ nullable: true })
      .bail()
      .isBoolean()
      .withMessage("isDefault must be boolean")
      .toBoolean(),
  ];
};

export const validateAddressAdd = validateAddress(false);
export const validateAddressUpdate = validateAddress(true);
