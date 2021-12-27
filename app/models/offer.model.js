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
    imagePath: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
      required: true,
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
    address: {
      type: Sequelize.STRING,
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
  return Offer;
};
