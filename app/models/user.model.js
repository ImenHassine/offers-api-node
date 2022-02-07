var bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    zip_code: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    activate: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: "0",
    },
    password: {
      type: Sequelize.STRING,
    },
    // confirm_mail: {
    //   type: Sequelize.BOOLEAN, allowNull: true, defaultValue: "0"
    // }   ,
    // confirmMailToken: {
    //   type: Sequelize.STRING
    // },
    // tokenExpires: {
    //   type: Sequelize.DATE
    // },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
    },
    hasSubscription: {
      type: Sequelize.STRING,
    },
    startSubscription: {
      type: Sequelize.STRING,
    },
    endSubscription: {
      type: Sequelize.STRING,
    },
    createdBy: {
      type: Sequelize.UUID,
    },
    updatedBy: {
      type: Sequelize.UUID,
    },
    deletedBy: {
      type: Sequelize.UUID,
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
  User.beforeCreate(async (user, options) => {
    user.password = bcrypt.hashSync(user.password, 8);
  });
  return User;
};
