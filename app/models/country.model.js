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
  });
  return Country;
};
