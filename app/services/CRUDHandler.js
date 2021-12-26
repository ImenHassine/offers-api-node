"use strict";

const db = require("../models");
const { Op } = db.Sequelize;
const util = require("../helpers/utils");
const statusCode = require("../config/status.config");
const { getPagination, getPagingData } = require("../helpers/pagination");
const log4j = require("../config/configLog4js.js");

exports.getAllModel = async (
  name,
  model,
  page,
  size,
  arrayCondition,
  order = null,
  include = null,
  exclude = null
) => {
  const { offset, limit } = getPagination(page, size);
  try {
    const theModel = await model.findAndCountAll({
      where: {
        [Op.and]: arrayCondition,
      },
      distinct: true,
      order: order,
      include: include,
      limit,
      offset,
      attributes: { exclude: exclude },
    });
    if (theModel.count > 0) {
      const tab = getPagingData(page, limit, theModel.rows, theModel.count);
      log4j.loggerinfo.info(`${name} retrieved`);

      util.setSuccess(200, `${name} retrieved`, tab);
    } else {
      log4j.loggerinfo.info(`${name} list is empty`);

      util.setError(
        200,
        `${name} list is empty`,
        statusCode.CODE_SUCCESS.LIST_EMPTY
      );
    }
    return util;
  } catch (error) {
    log4j.loggererror.error(`${error}`);

    util.setError(400, error);
    return util;
  }
};

exports.addModel = async (name, model, newModel) => {
  try {
    const theModel = await model.create(newModel);
    log4j.loggerinfo.info(`${name} Added!`);

    util.setSuccess(201, `${name} Added!`, theModel);
    return util;
  } catch (error) {
    log4j.loggererror.error(`${error.message}`);

    util.setError(400, error.message);
    return util;
  }
};

exports.updateModel = async (name, model, id, updateModel, arrayCondition) => {
  try {
    const modelToUpdate = await model.findOne({
      where: {
        [Op.and]: arrayCondition,
      },
    });

    if (modelToUpdate) {
      const theModel = await model.update(updateModel, {
        where: {
          [Op.and]: arrayCondition,
        },
      });
      if (theModel != 1) {
        log4j.loggererror.error(`${name}Id does not exist ${id}`);

        util.setError(
          200,
          `${name}Id does not exist ${id}`,
          statusCode.CODE_ERROR.NOT_EXIST
        );
      } else {
        const theModelAfterupdate = await model.findByPk(id);
        log4j.loggerinfo.info(`${name} updated`);

        util.setSuccess(200, `${name} updated`, theModelAfterupdate);
      }
      return util;
    }
    log4j.loggererror.error(`${name}Id does not exist ${id}`);

    util.setError(
      200,
      `${name}Id does not exist ${id}`,
      statusCode.CODE_ERROR.NOT_EXIST
    );
    return util;
  } catch (error) {
    log4j.loggererror.error(`${error}`);

    util.setError(404, error);
    return util;
  }
};

exports.getAModel = async (
  name,
  model,
  arrayCondition,
  include = null,
  exclude = null
) => {
  try {
    const theModel = await model.findOne({
      where: { [Op.and]: arrayCondition },
      include: include,
      attributes: { exclude: exclude },
    });
    if (!theModel) {
      log4j.loggerinfo.info(`${name} list is empty`);

      util.setError(
        200,
        `${name} list is empty`,
        statusCode.CODE_SUCCESS.LIST_EMPTY
      );
      return util;
    }
    log4j.loggerinfo.info(`${name} retrieved`);

    util.setSuccess(200, `${name} retrieved`, theModel);
    return util;
  } catch (error) {
    log4j.loggererror.error(`${name} getById error`);

    util.setError(400, `${name} getById error`, error);
    return util;
  }
};
exports.deleteModelFromDB = (model, id) => {
  const modelToDelete = model.findOne({
    where: { id: Number(id) },
  });

  if (modelToDelete) {
    const deleteModel = model.destroy({
      where: { id: Number(id) },
    });
    return deleteModel;
  }
  return null;
};
exports.deleteModel = async (name, model, id, updateModel, arrayCondition) => {
  try {
    const theModel = await model.update(updateModel, {
      where: {
        [Op.and]: arrayCondition,
      },
    });
    if (theModel != 1) {
      log4j.loggererror.error(`${name}Id does not exist ${id}`);

      util.setError(
        200,
        `${name}Id does not exist ${id}`,
        statusCode.CODE_ERROR.NOT_EXIST
      );
    } else {
      log4j.loggerinfo.info(`${name} deleted`);

      util.setSuccess(200, `${name} deleted`, theModel);
    }
    return util;
  } catch (error) {
    log4j.loggererror.error(`${error}`);

    util.setError(400, error);
    return util;
  }
};
