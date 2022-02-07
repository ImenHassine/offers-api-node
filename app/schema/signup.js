"use strict";
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    username: yup.string().required("username is a required field"),
    email: yup.string().required("email is a required field"),
    firstname: yup.string().required("firstname is a required field"),
    lastname: yup.string().required("lastname is a required field"),
    phone: yup.string().matches(/^[0-9]+$/, "Must be only digits").required("phone is a required field"),
  }),
  // file: yup.object().required("Icon is a required field"),
});
const patchSchema = yup.object({
  body: yup.object({
    username: yup.string().required("username is a required field"),
    email: yup.string().required("email is a required field"),
    firstname: yup.string().required("firstname is a required field"),
    lastname: yup.string().required("lastname is a required field"),
    phone: yup.string().matches(/^[0-9]+$/, "Must be only digits").required("phone is a required field"),
  }),
});

const validation = {
  schema: schema,
  patchSchema: patchSchema,
};
module.exports = validation;
