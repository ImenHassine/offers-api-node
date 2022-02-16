const db = require("../models");
const Model = db.countries;
const util = require("../helpers/Utils");
const statusCode = require("../config/status.config");
const log4j = require("../config/configLog4js.js");
const { checkExist, checkDoesNotExist } = require("../services/checkExist");
const {
  addModel,
  getAllModel,
  getAModel,
  updateModel,
  deleteModel,
} = require("../services/CRUDHandler");
const nameModel = "Country";

exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { arrayCondition } = req;
  let attributes = [
    "deleted",
    "deletedBy",
    "title_ar",
    "description_ar",
    "title_fr",
    "description_fr",
  ];
  if (req.url == "/ar") {
    attributes = [
      "deleted",
      "deletedBy",
      "title",
      "description",
      "title_fr",
      "description_fr",
    ];
  } else if (req.url == "/fr") {
    attributes = [
      "deleted",
      "deletedBy",
      "title_ar",
      "description_ar",
      "title",
      "description",
    ];
  }

  return (
    await getAllModel(
      nameModel,
      Model,
      page,
      size,
      arrayCondition,
      "",
      "",
      attributes
    )
  ).send(res);
};

exports.add = async (req, res) => {
  console.log('body in add',req.body)
  console.log('req.files in add',req.files)
  // console.log('body',req)

  const newData = {
    title: req.body.title,
    title_fr: req.body.title_fr,
    title_ar: req.body.title_ar,

    code: req.body.code,
    description: req.body.description,
    description_fr: req.body.description_fr,
    description_ar: req.body.description_ar,

    imagePath: req.file.path,
    imageSize: req.file.size,
    imageMimetype: req.file.mimetype,
    createdBy: req.body.createdBy,
  };

  const condition = [{ deleted: 0 }, { code: req.body.code }];
  const exist = await checkDoesNotExist(nameModel, Model, condition, res);
  if (exist) return;
  return (await addModel(nameModel, Model, newData)).send(res);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const { deletedBy } = req.body;
  const arrayCondition = [{ deleted: 0, id: id }];
  const alteredData = { deleted: 1, deletedBy: deletedBy };
  return (
    await deleteModel(nameModel, Model, id, alteredData, arrayCondition)
  ).send(res);
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  const arrayCondition = [{ deleted: 0 }, { id: id }];
  const attributes = ["deleted", "deletedBy"];

  return (
    await getAModel(nameModel, Model, arrayCondition, null, attributes)
  ).send(res);
};

exports.findByCode = async (req, res) => {
  const { code } = req.params;
  const arrayCondition = [{ deleted: 0 }, { code: code }];
  const attributes = ["deleted", "deletedBy"];

  return (
    await getAModel("code", Model, arrayCondition, null, attributes)
  ).send(res);
};

exports.patch = async (req, res) => {
  const { id } = req.params;
  const condition = [{ deleted: 0 }, { id: id }];
  await checkExist(nameModel, Model, condition, res);

  const data = await Model.findOne({
    where: { code: req.body.code },
  });
  if (!data) {
    const alteredData = req.body;
    const arrayCondition = [{ deleted: 0, id: id }];
    return (
      await updateModel(nameModel, Model, id, alteredData, arrayCondition)
    ).send(res);
  } else {
    log4j.loggererror.error(
      `${nameModel} with code: ${req.body.code} already exist`
    );
    util.setError(
      400,
      `${nameModel} with code: ${req.body.code} already exist`,
      statusCode.CODE_ERROR.NOT_EXIST
    );
    return util.send(res);
  }
};
