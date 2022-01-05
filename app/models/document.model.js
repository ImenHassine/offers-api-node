module.exports = (sequelize, Sequelize) => {
  const Document = sequelize.define(
    "Document",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      description: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      extension: {
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
    },
    {
      sequelize,
      modelName: "Document",
    }
  );

  return Document;
};
