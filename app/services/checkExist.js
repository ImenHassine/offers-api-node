"use strict";
require("dotenv").config();
const db = require("../models");
const { Op } = db.Sequelize;

const util = require("../helpers/utils");
const statusCode = require("../config/status.config.js");

// Middleware will continue if the token is inside the local storage
exports.checkExist = async (name, modal, arrayCondition, res) => {
  try {
    const theModel = await modal.findOne({
      where: {
        [Op.and]: arrayCondition,
      },
    });
    if (!theModel) {
      util.setError(
        "400",
        `${name}Id does not exist`,
        statusCode.CODE_ERROR.NOT_EXIST
      );
      return util.send(res);
    }
    return theModel;
  } catch (error) {
    util.setError(
      "400",
      `${name}Id: ${error.message}`,
      statusCode.CODE_ERROR.NOT_EXIST
    );
    return util.send(res);
  }
};

exports.checkDoesNotExist = async (name, modal, arrayCondition, res) => {
  try {
    const theModel = await modal.findOne({
      where: {
        [Op.and]: arrayCondition,
      },
    });
    if (theModel) {
      util.setError(
        "400",
        `${name} already exist`,
        statusCode.CODE_ERROR.ALREADY_EXIST
      );
      return util.send(res);
    }
    return theModel;
  } catch (error) {
    util.setError(
      "400",
      `${name}Id: ${error.message}`,
      statusCode.CODE_ERROR.NOT_EXIST
    );
    return util.send(res);
  }
};
