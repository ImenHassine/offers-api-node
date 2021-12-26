"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    title: yup.string().required("title is a required field"),
    code: yup.string().required("code is a required field"),
    description: yup.string().required("description is a required field"),
  }),
});
const patchSchema = yup.object({
  body: yup.object({
    title: yup.string().required("title is a required field"),
    code: yup.string().required("code is a required field"),
    description: yup.string().required("description is a required field"),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
};
module.exports = validation;
