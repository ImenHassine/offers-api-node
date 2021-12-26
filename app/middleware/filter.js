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
      let start_date = null;
      let end_date = null;
      // //////////////date////////////////////////
      if (key == "start_date") start_date = value;
      if (key == "end_date") end_date = value;

      // /////////////////filter date//////////////
      let conditionDate = null;
      if (start_date && end_date) {
        conditionDate = {
          createdAt: {
            [Op.between]: [start_date, moment(end_date).add(1, "days")],
          },
        };
        arrayCondition.push(conditionDate);
      }
      if (start_date && !end_date) {
        conditionDate = {
          createdAt: { [Op.gte]: start_date },
        };
        arrayCondition.push(conditionDate);
      }

      if (!start_date && end_date) {
        conditionDate = {
          createdAt: { [Op.lte]: moment(end_date).add(1, "days") },
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
      } else if (!start_date && !end_date) {
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
