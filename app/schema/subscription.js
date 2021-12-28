"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    type: yup.string().required("type is a required field"),
    price: yup.string().required("price is a required field"),
    per: yup.string().required("per is a required field"),
    description: yup.string().required("description is a required field"),
  }),
});
const patchSchema = yup.object({
  body: yup.object({
    type: yup.string(),
    price: yup.string(),
    per: yup.string(),
    description: yup.string(),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
};
module.exports = validation;
