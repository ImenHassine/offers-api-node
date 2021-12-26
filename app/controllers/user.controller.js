const db = require("../models");
const User = db.user;
const Role = db.role;

const util = require("../helpers/Utils");
const Op = db.Sequelize.Op;
const mail = require("../services/emails/emailProvider");
const { getPagination, getPagingData } = require("../helpers/pagination");
const loggerFunction = require("../helpers/loggerFunction");
const log4j = require("../config/configLog4js.js");
const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.visitorBoard = (req, res) => {
  res.status(200).send("Visitor Content.");
};
exports.findAll = (req, res) => {
  console.log("findAll");
  // loggerFunction.loggerFunction(req, res);
  const { username, firstname, lastname, email, page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const conditionName = username ? { username: { [Op.eq]: username } } : null;
  const conditionFirstName = firstname
    ? { firstname: { [Op.eq]: firstname } }
    : null;
  const conditionLastName = lastname
    ? { lastname: { [Op.eq]: lastname } }
    : null;
  const conditionEmail = email ? { email: { [Op.eq]: email } } : null;
  try {
    User.findAndCountAll({
      where: {
        [Op.and]: [
          { deleted: 0 },
          conditionName,
          conditionFirstName,
          conditionLastName,
          conditionEmail,
        ],
      },
      limit,
      offset,
      include: [
        {
          model: Role,
          where: { id: 1 },
          required: true,
        },
      ],
      attributes: {
        exclude: ["deleted", "deletedBy"],
      },
      logging: function (msg) {
        log4j.loggerdebug.debug("get All Type!!" + msg);
      },
    })
      .then((data) => {
        console.log("data.rows.length", data.rows.length);

        if (data.count > 0) {
          const tab = getPagingData(data, page, limit);

          util.setSuccess(200, "User retrieved", tab);
        } else {
          util.setSuccess(200, "No User found");
        }
        return util.send(res);
      })
      .catch((err) => {
        log4j.loggerfatal.fatal(
          "`User does not exist or content is empty ${id}`" + err
        );
      });
  } catch (error) {
    util.setError(400, error);
    return util.send(res);
  }
};

exports.activateUser = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const alteredUser = req.body;
  const id = req.params.id;
  const updatedBy = req.body.updatedBy;
  if (!req.body.activate || !req.body.updatedBy) {
    util.setError(400, "Please provide complete details");
    return util.send(res);
  }
  try {
    alteredUser.updatedBy = updatedBy;
    const updateUser = await User.update(alteredUser, {
      where: { id: id, deleted: 0 },
    });
    if (updateUser != 1) {
      util.setError(404, `Cannot find user with the id: ${id}`);
    } else {
      const UserAfterupdate = await User.findByPk(id);
      console.log(UserAfterupdate);
      util.setSuccess(200, "User updated", UserAfterupdate);
    }
    return util.send(res);
  } catch (error) {
    util.setError(404, error.message);
    return util.send(res);
  }
};

exports.findOneUser = (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const id = req.params.id;
  User.findOne({
    where: { deleted: 0, id: id },
    logging: function (msg) {
      log4j.loggerdebug.debug(msg);
    },
    include: [
      {
        model: Role,
        where: { id: 1 },
        required: true,
      },
    ],
  })
    .then((data) => {
      util.setSuccess(200, "User retrieved", data);
      util.send(res);
    })
    .catch((err) => {
      util.setError(500, err.message);
      return util.send(res);
    });
};

exports.updatedUser = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const alteredUser = req.body;
  const id = req.params.id;
  const updatedBy = req.body.updatedBy;
  if (
    !req.body.username ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password ||
    !req.body.updatedBy
  ) {
    util.setError(400, "Please provide complete details");
    return util.send(res);
  }
  try {
    const getUserByUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (getUserByUser) {
      util.setError(404, `Username already exist`);
      return util.send(res);
    }
    // Email
    const getUserByEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (getUserByEmail) {
      util.setError(404, `Email already exist`);
      return util.send(res);
    }

    alteredUser.updatedBy = updatedBy;
    alteredUser.password = bcrypt.hashSync(req.body.password, 8);

    const updateUser = await User.update(alteredUser, {
      where: { id: id, deleted: 0 },
    });
    if (updateUser != 1) {
      util.setError(404, `Cannot find suplier with the id: ${id}`);
    } else {
      const UserAfterupdate = await User.findByPk(id);
      console.log(UserAfterupdate);
      util.setSuccess(200, "User updated", UserAfterupdate);
    }
    return util.send(res);
  } catch (error) {
    util.setError(404, error.message);
    return util.send(res);
  }
};

exports.patchUser = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const alteredUser = req.body;
  const id = req.params.id;
  const updatedBy = req.body.updatedBy;
  if (!req.body.updatedBy) {
    util.setError(400, "Please enter champ updateBy");
    return util.send(res);
  }
  if (req.body.username) {
    const getUserByUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (getUserByUser) {
      util.setError(404, `Username already exist`);
      return util.send(res);
    }
  }

  if (req.body.email) {
    // Email
    const getUserByEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (getUserByEmail) {
      util.setError(404, `Email already exist`);
      return util.send(res);
    }
  }

  if (req.body.password) {
    alteredUser.password = bcrypt.hashSync(req.body.password, 8);
  }

  try {
    alteredUser.updatedBy = updatedBy;
    const updateUser = await User.update(alteredUser, {
      where: { id: id, deleted: 0 },
    });
    if (updateUser != 1) {
      util.setError(404, `Cannot find user with the id: ${id}`);
    } else {
      const UserAfterupdate = await User.findByPk(id);
      console.log(UserAfterupdate);
      util.setSuccess(200, "User updated", UserAfterupdate);
    }
    return util.send(res);
  } catch (error) {
    util.setError(404, error.message);
    return util.send(res);
  }
};

exports.deleteUser = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const id = req.params.id;
  const deletedBy = req.body.deletedBy;
  if (!deletedBy) {
    util.setError(400, "Please enter deletedBy in params");
    return util.send(res);
  }
  console.log(id);
  try {
    const UserDelete = await User.update(
      { deleted: 1, deletedBy: deletedBy },
      { where: { id: id, deleted: 0 } }
    );
    console.log(UserDelete);
    if (UserDelete == 1) {
      util.setSuccess(200, "User deleted", UserDelete);
    } else {
      util.setError(404, `User with the id ${id} cannot be found`);
    }
    return util.send(res);
  } catch (error) {
    util.setError(400, error);
    return util.send(res);
  }
};

exports.forgot = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const email = req.body.email;
  if (!req.body.email) {
    log4j.loggererror.error("Please provide complete details");
    util.setError(400, "Please provide complete details");
    return util.send(res);
  }
  User.findOne({
    where: { deleted: 0, email: email },
    logging: function (msg) {
      log4j.loggerdebug.debug(msg);
    },
  })
    .then((data) => {
      if (!data) {
        util.setError(400, "Email does not exist");
        return util.send(res);
      }
      const token = bcrypt.hashSync("test", 8);
      const resetPasswordToken = token;
      const resetPasswordExpires = Date.now() + 3600000; // 1 hour
      console.log("token", token);
      try {
        User.update(
          {
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpires: resetPasswordExpires,
          },
          {
            where: { email: email, deleted: 0 },
          }
        ).then((data) => {
          if (data != 1) {
            util.setError(404, `Cannot reset password`);
          } else {
            // const UserAfterupdate = await User.findByPk(id);
            // let url_confirm = "localhost:4005/api/user/reset_password/"+token
            // console.log("send mail",url_confirm);
            // mail.send_email("Reset password","Veuillez cliquer sur lien pour changer le mot de passe",email)
            mail.sendPasswordReset(email, token);
            util.setSuccess(200, "Email has been sent");
          }
          return util.send(res);
        });
      } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
      }
    })
    .catch((err) => {
      util.setError(500, err.message);
      return util.send(res);
    });
};

exports.reset = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const token = req.query.token;
  console.log("token", token);
  const new_password = req.body.new_password;

  User.findOne({
    where: {
      deleted: 0,
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
    logging: function (msg) {
      log4j.loggerdebug.debug(msg);
    },
  })
    .then((data) => {
      console.log("data", data);
      if (!data) {
        util.setError(400, "Can not reset");
        return util.send(res);
      }
      // console.log("aaa",bcrypt.compareSync(old_password, data.password))

      const alteredUser = {
        password: bcrypt.hashSync(new_password, 8),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      };
      try {
        User.update(alteredUser, {
          where: {
            resetPasswordToken: token,
            resetPasswordExpires: { [Op.gt]: Date.now() },
            deleted: 0,
          },
        }).then((data) => {
          if (data != 1) {
            util.setError(404, `Cannot reset password`);
          } else {
            // const UserAfterupdate = await User.findByPk(id);
            // console.log(UserAfterupdate);
            util.setSuccess(200, "Password has been updated");
          }
          return util.send(res);
        });
      } catch (error) {
        util.setError(404, error.message);
        return util.send(res);
      }
    })
    .catch((err) => {
      util.setError(500, err.message);
      return util.send(res);
    });
};

exports.modify = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  // const id = req.params.id;
  const id = req.userId;

  const old_password = req.body.old_password;
  const new_password = req.body.new_password;
  if (!req.body.old_password || !req.body.new_password) {
    log4j.loggererror.error("Please provide complete details");
    util.setError(400, "Please provide complete details");
    return util.send(res);
  }
  User.findOne({
    where: { deleted: 0, id: id },
    logging: function (msg) {
      log4j.loggerdebug.debug(msg);
    },
  })
    .then((data) => {
      if (!data) {
        util.setError(400, "User does not exist");
        return util.send(res);
      }
      // console.log("aaa",bcrypt.compareSync(old_password, data.password))
      if (bcrypt.compareSync(old_password, data.password)) {
        const alteredUser = {
          password: bcrypt.hashSync(new_password, 8),
        };
        try {
          User.update(alteredUser, {
            where: { id: id, deleted: 0 },
          }).then((data) => {
            if (data != 1) {
              util.setError(404, `Cannot change password`);
            } else {
              // const UserAfterupdate = await User.findByPk(id);
              // console.log(UserAfterupdate);
              util.setSuccess(200, "Password has been updated");
            }
            return util.send(res);
          });
        } catch (error) {
          util.setError(404, error);
          return util.send(res);
        }
      } else {
        util.setError(400, "Password incorrect");
        return util.send(res);
      }
    })
    .catch((err) => {
      util.setError(500, err.message);
      return util.send(res);
    });
};

exports.updatedUserByAdmin = async (req, res) => {
  loggerFunction.loggerFunction(req, res);
  const alteredUser = req.body;
  const id = req.params.id;
  const updatedBy = req.body.updatedBy;
  console.log("updatedBy", updatedBy);
  if (
    !req.body.username ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password ||
    !req.body.updatedBy
  ) {
    util.setError(400, "Please provide complete user details");
    return util.send(res);
  }
  try {
    const getUserByUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (getUserByUser) {
      util.setError(404, `Username already exist`);
      return util.send(res);
    }
    // Email
    const getUserByEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (getUserByEmail) {
      util.setError(404, `Email already exist`);
      return util.send(res);
    }
    alteredUser.updatedBy = updatedBy;
    alteredUser.password = bcrypt.hashSync(req.body.password, 8);
    const updateUser = await User.update(alteredUser, {
      where: { id: id, deleted: 0 },
    });
    if (updateUser != 1) {
      util.setError(404, `Cannot find user with the id: ${id}`);
    } else {
      const UserAfterupdate = await User.findByPk(id);
      util.setSuccess(200, "User updated", UserAfterupdate);
    }
    return util.send(res);
  } catch (error) {
    util.setError(404, error.message);
    return util.send(res);
  }
};
