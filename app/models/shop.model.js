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
    address: {
      type: Sequelize.STRING,
      required: true,
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
  return Shop;
};
