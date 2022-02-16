module.exports = (sequelize, Sequelize) => {
  const Shop = sequelize.define("Shop", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    name_fr: {
      type: Sequelize.STRING,
    },
    name_ar: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
      required: true,
    },
    address_fr: {
      type: Sequelize.STRING,
    },
    address_ar: {
      type: Sequelize.STRING,
    },
    location_x: {
      type: Sequelize.STRING,
      required: true,
    },
    location_y: {
      type: Sequelize.STRING,
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
  return Shop;
};
