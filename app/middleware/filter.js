"use strict";
require("dotenv").config();
const db = require("../models");
const validator = require("validator");
const { Op } = db.Sequelize;
const moment = require("moment");

const filter = () => (req, res, next) => {
  try {
    const name = {
      title: "title",
      code: "code",
      description: "description",
      name: "name",
    };
    const arrayCondition = [{ deleted: 0 }];
    const order = [];
    // eslint-disable-next-line array-element-newline
    const trueFalse = ["true", "false"];
    const keys = Object.keys(req.query);
    const values = Object.values(req.query);

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = values[index];
      let startDate = null;
      let endDate = null;
      // //////////////date////////////////////////
      if (key == "startDate") startDate = value;
      if (key == "endDate") endDate = value;

      // /////////////////filter date//////////////
      let conditionDate = null;
      if (startDate && endDate) {
        conditionDate = {
          createdAt: {
            [Op.between]: [startDate, moment(endDate).add(1, "days")],
          },
        };
        arrayCondition.push(conditionDate);
      }
      if (startDate && !endDate) {
        conditionDate = {
          createdAt: { [Op.gte]: startDate },
        };
        arrayCondition.push(conditionDate);
      }

      if (!startDate && endDate) {
        conditionDate = {
          createdAt: { [Op.lte]: moment(endDate).add(1, "days") },
        };
        arrayCondition.push(conditionDate);
      }
      // ////////////////////////////
      const orderNameSplit = key.split("_");
      console.log("ext", orderNameSplit);
      if (orderNameSplit[0] == "order") {
        if (name[orderNameSplit[1]]) {
          const orderName = [orderNameSplit[1], value];
          order.push(orderName);
        }
      } else if (!startDate && !endDate) {
        if (name[key]) {
          // eslint-disable-next-line prefer-const
          let filterCondition = {};
          filterCondition[name[key]] = name[key];
          if (
            validator.isUUID(value, 4) ||
            name[key] == "code" ||
            trueFalse.includes(value)
          ) {
            filterCondition[name[key]] = { [Op.eq]: value };
          } else {
            filterCondition[key] = { [Op.like]: `%${value}%` };
          }
          const condition = value ? filterCondition : null;
          arrayCondition.push(condition);
        }
      }
    }
    req.arrayCondition = arrayCondition;
    req.order = order;
    next();
  } catch (err) {}
};

module.exports = filter;
