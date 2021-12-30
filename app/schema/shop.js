"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    name: yup.string().required("name is a required field"),
    address: yup.string().required("address is a required field"),
    location_x: yup.string(),
    location_y: yup.string(),
  }),
});
const patchSchema = yup.object({
  body: yup.object({
    name: yup.string(),
    address: yup.string(),
    location_x: yup.string(),
    location_y: yup.string(),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
};
module.exports = validation;
