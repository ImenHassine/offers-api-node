module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define("Offer", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
    },
    title_fr: {
      type: Sequelize.STRING,
    },
    title_ar: {
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
    discount: {
      type: Sequelize.STRING,
      required: true,
    },
    available: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
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
  return Offer;
};
