const db = require("../models");
const Model = db.shops;
const Document = db.documents;

const { checkDoesNotExist } = require("../services/checkExist");
const {
  addModel,
  getAllModel,
  getAModel,
  updateModel,
  deleteModel,
} = require("../services/CRUDHandler");
const nameModel = "Shops";

exports.findAll = async (req, res) => {
  const { page, size } = req.query;

  const { arrayCondition } = req;
  const attributes = ["deleted", "deletedBy"];
  const includes = [
    {
      attributes: { exclude: ["deleted"] },
      model: Document,
      as: "documents_shops",
    },
  ];

  return (
    await getAllModel(
      nameModel,
      Model,
      page,
      size,
      arrayCondition,
      "",
      includes,
      attributes
    )
  ).send(res);
};

exports.add = async (req, res) => {
  const images = [];
  req.body.files.forEach((element) => {
    images.push({
      file: element.path,
      size: element.size,
      extension: element.mimetype,
      createdBy: req.body.createdBy,
    });
  });
  const newData = {
    name: req.body.name,
    address: req.body.address,
    location_x: req.body.location_x,
    location_y: req.body.location_y,
    documents_shops: images,
    createdBy: req.body.createdBy,
  };
  const includes = [
    {
      attributes: { exclude: ["deleted"] },
      model: Document,
      as: "documents_shops",
    },
  ];

  return (await addModel(nameModel, Model, newData, includes)).send(res);
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
