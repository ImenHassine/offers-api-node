"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    title: yup.string().required("title is a required field"),
    price: yup.string().required("price is a required field"),
    discount: yup.string().required("discount is a required field"),
    address: yup.string().required("address is a required field"),
    description: yup.string().required("description is a required field"),
  }),
});
const patchSchema = yup.object({
  body: yup.object({
    title: yup.string(),
    price: yup.string(),
    discount: yup.string(),
    address: yup.string(),
    description: yup.string(),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
};
module.exports = validation;
