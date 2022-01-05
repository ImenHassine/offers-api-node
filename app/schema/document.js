"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    description: yup.string().required("description is a required field"),
    file: yup.string().required("file is a required field"),
  }),
});
const patchSchema = yup.object({
  body: yup.object({
    description: yup.string().required("description is a required field"),
    file: yup.string().required("file is a required field"),
  }),
});
const putSchema = yup.object({
  body: yup.object({
    description: yup.string().required("description is a required field"),
    file: yup.string().required("file is a required field"),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
  putSchema: putSchema,
};
module.exports = validation;
