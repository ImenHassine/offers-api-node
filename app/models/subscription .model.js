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
    type_fr: {
      type: Sequelize.STRING,
    },
    type_ar: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
      required: true,
    },
    description_fr: {
      type: Sequelize.STRING,
    },
    description_ar: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
      required: true,
    },
    per: {
      type: Sequelize.STRING, // Month/year/..
      required: true,
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
  return Subscription;
};
