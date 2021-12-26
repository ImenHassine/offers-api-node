const db = require("../models");
const Model = db.categories;
const util = require("../helpers/utils");
const statusCode = require("../config/status.config");
const logger = require("../config/Logger");
const { checkExist, checkDoesNotExist } = require("../services/checkExist");
const {
  getAllModel,
  getAModel,
  updateModel,
} = require("../services/CRUDHandler");
const nameModel = "Category";

exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { arrayCondition } = req;
  const attributes = ["deleted", "deletedBy"];

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
  const newData = {
    title: req.body.title,
    code: req.body.code,
    description: req.body.description,
    created_by: req.body.created_by,
  };

  const condition = [{ deleted: 0 }, { code: req.body.code }];
  await checkDoesNotExist(nameModel, Model, condition, res);

  return (await addModel(nameModel, Model, newData)).send(res);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const { deleted_by } = req.body;
  const arrayCondition = [{ deleted: 0, id: id }];
  const alteredData = { deleted: 1, deleted_by: deleted_by };
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
    logger.error(`${nameModel} with code: ${req.body.code} already exist`);
    util.setError(
      400,
      `${nameModel} with code: ${req.body.code} already exist`,
      statusCode.CODE_ERROR.NOT_EXIST
    );
    return util.send(res);
  }
};
