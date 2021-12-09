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
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    zip_code: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    activate: {
      type:Sequelize.BOOLEAN, allowNull: true, defaultValue: "0"
    },
    password: {
      type: Sequelize.STRING
    },
    resetPasswordToken: {
      type: Sequelize.STRING
    },  
    resetPasswordExpires: {
      type: Sequelize.DATE
    },  
    createdBy: {
      type: Sequelize.STRING
    },
    updatedBy: {
      type: Sequelize.STRING
    },
    deletedBy: {
      type: Sequelize.STRING
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }

  });
  User.beforeCreate(async (user, options) => {
   user.password=bcrypt.hashSync(user.password, 8)
  });
  return User;
};