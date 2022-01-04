/* eslint-disable camelcase */
module.exports = (sequelize, Sequelize) => {
  const Country_Category = sequelize.define(
    "Country_Category",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    },
    {
      sequelize,
      modelName: "Country_Category",
    }
  );

  return Country_Category;
};
