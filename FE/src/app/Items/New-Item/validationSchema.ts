import * as Yup from "yup";
export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  type: Yup.string().optional(),
  brand: Yup.string().required("Brand is required"),
  color: Yup.array().of(Yup.string()).required("select at least one color"),
  condition: Yup.string().required("Condition is required"),
  size: Yup.string(),
  price: Yup.number().required("Price is required").min(0, "Price must be positive"),
  communications: Yup.array().of(Yup.string()).required("select one communication option"),
  allowNegotiate: Yup.boolean(),
  discount: Yup.number().when("isDiscount", {
    is: true,
    then: (schema) =>
      schema
        .required("Discount is required")
        .positive("Discount must be positive amd more than 0")
        .test("is-less-than-or-equal-to-price", "Discount must be less than price", function (value) {
          const { price } = this.parent;
          return value < price;
        }),
    otherwise: (schema) => schema.notRequired().min(0, "Discount can&#39;t  be 0"),
  }),

  itemImages: Yup.array()
    .of(Yup.mixed().required("Image is required"))
    .min(1, "upload at least 1 image")
    .max(6, "can't upload more than 6 images"),
  paymentOptions: Yup.array().of(Yup.string()).min(1, "At least select one payment option"),
  location: Yup.string().required("Location is required"),
  isSavedForLater: Yup.boolean(),
});
