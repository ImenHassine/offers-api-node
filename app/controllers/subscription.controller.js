const db = require("../models");
const Model = db.subscriptions;
const { checkDoesNotExist } = require("../services/checkExist");
const {
  addModel,
  getAllModel,
  getAModel,
  updateModel,
  deleteModel,
} = require("../services/CRUDHandler");
const nameModel = "Subscription";

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
    type: req.body.type,
    type_fr: req.body.type_fr,
    type_ar: req.body.type_ar,

    price: req.body.price,
    description: req.body.description,
    description_fr: req.body.description_fr,
    description_ar: req.body.description_ar,

    per: req.body.per,
    createdBy: req.body.createdBy,
  };
  const condition = [{ deleted: 0 }, { type: req.body.type }];
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
  const alteredData = req.body;
  const arrayCondition = [{ deleted: 0, id: id }];
  return (
    await updateModel(nameModel, Model, id, alteredData, arrayCondition)
  ).send(res);
};
