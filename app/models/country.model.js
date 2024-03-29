module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("Country", {
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
  return Country;
};
