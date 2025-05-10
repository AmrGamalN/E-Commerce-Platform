import { body } from "express-validator";

const validateItem = (isUpdate: boolean) => {
  const required = (field: string) =>
    isUpdate
      ? body(field).optional({ nullable: true })
      : body(field).notEmpty().withMessage(`${field} is required`);

  const optional = (field: string) => body(field).optional({ nullable: true });

  return [
    // Category Info
    required("category").isString().withMessage("Category must be a string"),
    required("subcategory")
      .isString()
      .withMessage("Subcategory must be a string"),
    optional("brand").isString().withMessage("Brand must be a string"),
    optional("type").isString().withMessage("Type must be a string"),

    // Item Details
    required("title").isString().withMessage("Title must be a string"),
    required("description")
      .isString()
      .withMessage("Description must be a string"),

    required("itemImages")
      .isArray()
      .withMessage("Item images must be an array"),
    optional("itemImages.*.imageUrl")
      .isString()
      .withMessage("Each image must have a valid URL"),
    optional("itemImages.*.angles")
      .isNumeric()
      .withMessage("Rotation degree must be a number"),
    optional("itemImages.*.key")
      .isString()
      .withMessage("Image key must be a string"),

    optional("condition")
      .isIn([
        "New with tag",
        "New without tag",
        "Used with tag",
        "Used without tag",
        "Very Good",
        "Good",
        "",
      ])
      .withMessage(
        "Condition must be one of: New with tag, New without tag, Used with tag, Used without tag, Very Good, Good"
      )
      .default(""),

    optional("communications")
      .isArray()
      .withMessage("Communications must be an array"),
    optional("paymentOptions")
      .isArray()
      .withMessage("Payment options must be an array"),

    required("location").isString().withMessage("Location must be a string"),

    optional("size").isString().withMessage("Size must be a string"),
    optional("color").isArray().withMessage("Color must be an array"),

    required("price").isNumeric().withMessage("Price must be a number").toInt(),
    optional("discount")
      .isNumeric()
      .withMessage("Discount must be a number")
      .toInt(),
    optional("isDiscount")
      .isBoolean()
      .withMessage("isDiscount must be a boolean")
      .toBoolean(),
    optional("isSavedForLater")
      .isBoolean()
      .withMessage("isSavedForLater must be a boolean")
      .toBoolean(),
    optional("allowNegotiate")
      .isBoolean()
      .withMessage("allowNegotiate must be a boolean")
      .toBoolean(),
  ];
};

export const validateItemAdd = validateItem(false);
export const validateItemUpdate = validateItem(true);
