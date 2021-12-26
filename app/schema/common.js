"use strict";
const yup = require("yup");

const createdSchema = yup.object({
  body: yup.object({
    createdBy: yup
      .string()
      .required("createdBy is a required field")
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "createdBy should only be UUID v4 "
      ),
  }),
});
const updatedSchema = yup.object({
  body: yup.object({
    updatedBy: yup
      .string()
      .required("updatedBy is a required field")
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "updatedBy should only be UUID v4 "
      ),
  }),
});
const deletedSchema = yup.object({
  body: yup.object({
    deletedBy: yup
      .string()
      .required("deletedBy is a required field")
      .matches(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        "deletedBy should only be UUID v4 "
      ),
  }),
});

const schema = {
  createdSchema: createdSchema,
  updatedSchema: updatedSchema,
  deletedSchema: deletedSchema,
};
module.exports = schema;
