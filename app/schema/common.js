"use strict";
const yup = require("yup");
const {
  checkIfImageIsCorrectType,
  checkIfFileIsTooBig,
  checkIfImagesIsCorrectType,
  checkIfFilesIsTooBig,
} = require("../helpers/validation");
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

const fileSchema = yup.object({
  body: yup.object({
    file: yup
      .object()
      .required("file is a required field")
      .test(
        "is-correct-file",
        "Only .png, .jpg and .jpeg format allowed",
        checkIfImageIsCorrectType
      )
      .test(
        "is-big-file",
        "File is too large (file > 2MB)",
        checkIfFileIsTooBig
      ),
  }),
});

const filesSchema = yup.object({
  body: yup.object({
    files: yup
      .array()
      .required("files is a required field")
      .test(
        "are-correct-files",
        "Only .png, .jpg and .jpeg format allowed",
        checkIfImagesIsCorrectType
      )
      .test(
        "are-big-files",
        "Files is too large (file > 2MB)",
        checkIfFilesIsTooBig
      ),
  }),
});

const schema = {
  createdSchema: createdSchema,
  updatedSchema: updatedSchema,
  deletedSchema: deletedSchema,
  fileSchema: fileSchema,
  filesSchema: filesSchema,
};
module.exports = schema;
