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
      },
      title_fr: {
        type: Sequelize.STRING,
      },
      title_ar: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
        required: true,
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

      imagePath: {
        type: Sequelize.STRING,
      },
      imageSize: {
        type: Sequelize.STRING,
      },
      imageMimetype: {
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
      modelName: "Category",
    }
  );
  return Category;
};
