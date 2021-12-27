module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("Subscription", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      required: true,
    },
    description: {
      type: Sequelize.STRING,
      required: true,
    },
    price: {
      type: Sequelize.STRING,
      required: true,
    },
    per: {
      type: Sequelize.STRING, //Month/year/..
      required: true,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
    deletedBy: {
      type: Sequelize.STRING,
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });
  return Subscription;
};
