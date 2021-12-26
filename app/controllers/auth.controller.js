const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const log4j = require("../config/configLog4js.js");
const util = require("../helpers/Utils");
const loggerFunction = require("../helpers/loggerFunction");
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { omit } = require("lodash");

exports.signup = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const userData = omit(req.body, ["roles"]);
  userData.activate = 1;
  User.create(userData)
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(async () => {
            const userFinded = await User.findByPk(user.id, {
              attributes: {
                exclude: [
                  "deleted",
                  "deletedBy",
                  "createdBy",
                  "createdAt",
                  "updatedBy",
                  "updatedAt",
                ],
              },
            });
            // emailProvider.sendMailConfirm(req.body.email,confirmMailToken);
            log4j.loggerinfo.info("User registered successfully");
            util.setSuccess(200, "User registered successfully", userFinded);
            return util.send(res);
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          // emailProvider.sendMailConfirm(req.body.email,confirmMailToken);
          log4j.loggerinfo.info("User registered successfully");
          util.setSuccess(200, "User registered successfully", user);
          return util.send(res);
        });
      }
    })
    .catch((err) => {
      log4j.loggerfatal.fatal("Save User to Database " + err.message);
      util.setError(500, err.message);
      return util.send(res);
    });
};

exports.signin = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message:
        "username or password is empty username: " +
        req.body.username +
        " password: " +
        req.body.password,
    });
  }
  console.log("username", req.body.username);
  console.log("password", req.body.password);
  User.findOne({
    where: {
      username: req.body.username,
      deleted: 0,
    },
  })
    .then((user) => {
      if (!user) {
        log4j.loggerfatal.fatal("signin " + "User Not found");
        util.setError(500, "User Not found");
        return util.send(res);
      }
      if (user.activate == false) {
        log4j.loggerfatal.fatal("signin " + "User is desactivated");
        util.setError(500, "User is desactivated");
        return util.send(res);
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        log4j.loggerinfo.warn("signin " + "Invalid Password!");
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      const authorities = [];
      // user.setRoles([3]).then(() => {
      // })

      user.getRoles().then((roles) => {
        console.log("roles", roles);

        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        log4j.loggerinfo.info("signin " + "200!");

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
