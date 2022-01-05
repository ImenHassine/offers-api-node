"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    title: yup.string().required("title is a required field"),
    price: yup.string().required("price is a required field"),
    discount: yup.string().required("discount is a required field"),
    description: yup.string().required("description is a required field"),
    ShopId: yup
      .string()
      .required("ShopId is a required field")
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "ShopId should only be UUID v4 "
      ),
    CountryCategoryId: yup
      .string()
      .required("CountryCategoryId is a required field")
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "CountryCategoryId should only be UUID v4 "
      ),
  }),
});
const patchSchema = yup.object({
  body: yup.object({
    title: yup.string(),
    price: yup.string(),
    discount: yup.string(),
    description: yup.string(),
    ShopId: yup
      .string()
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "ShopId should only be UUID v4 "
      ),
    CountryCategoryId: yup
      .string()
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "CountryCategoryId should only be UUID v4 "
      ),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
};
module.exports = validation;
