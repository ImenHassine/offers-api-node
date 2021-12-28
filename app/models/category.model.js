module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
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
      code: {
        type: Sequelize.STRING,
        required: true,
      },
      description: {
        type: Sequelize.STRING,
        required: true,
      },
      imagePath: {
        type: Sequelize.STRING,
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
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
