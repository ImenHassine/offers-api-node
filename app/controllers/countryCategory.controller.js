const db = require("../models");
const Model = db.countries_categories;
const { checkExist } = require("../services/checkExist");
const {
  addModel,
  getAllModel,
  getAModel,
  updateModel,
  deleteModel,
} = require("../services/CRUDHandler");
const nameModel = "country_category";

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
    CategoryId: req.body.CategoryId,
    CountryId: req.body.CountryId,
    createdBy: req.body.createdBy,
  };
  const conditionCategory = [{ deleted: 0 }, { id: req.body.CategoryId }];
  const notExistCategory = await checkExist(
    "Category",
    db.categories,
    conditionCategory,
    res,
    true
  );
  if (notExistCategory) return;
  const conditionCountry = [{ deleted: 0 }, { id: req.body.CountryId }];
  const notExistCountry = await checkExist(
    "Country",
    db.countries,

    conditionCountry,
    res,
    true
  );
  if (notExistCountry) return;
  const conditionCountryCategory = [
    { deleted: 0 },
    { CountryId: req.body.CountryId, CategoryId: req.body.CategoryId },
  ];
  const notExistCountryCategory = await checkExist(
    "Country Category",
    db.countries,
    conditionCountryCategory,
    res,
    true
  );
  if (notExistCountryCategory) return;
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
