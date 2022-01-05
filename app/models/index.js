const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];

const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.categories = require("../models/category.model")(sequelize, Sequelize);
db.offers = require("../models/offer.model")(sequelize, Sequelize);
db.shops = require("../models/shop.model")(sequelize, Sequelize);
db.subscriptions = require("../models/subscription .model")(
  sequelize,
  Sequelize
);
db.countries = require("../models/country.model")(sequelize, Sequelize);
db.countries_categories = require("../models/countryCategory.model")(
  sequelize,
  Sequelize
);
db.documents = require("../models/document.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  // otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  // otherKey: "roleId"
});

db.categories.hasMany(db.countries_categories, { as: "countries_categories" });
db.countries_categories.belongsTo(db.categories);
db.countries.hasMany(db.countries_categories, { as: "countries_categories" });
db.countries_categories.belongsTo(db.countries);

db.shops.hasMany(db.offers, { as: "shops" });
db.offers.belongsTo(db.shops);

db.countries_categories.hasMany(db.offers, { as: "countries_categories" });
db.offers.belongsTo(db.countries_categories);

db.subscriptions.hasMany(db.user, { as: "subscriptions" });
db.user.belongsTo(db.subscriptions);

db.shops.hasMany(db.documents, { as: "documents_shops" });
db.documents.belongsTo(db.shops);

db.offers.hasMany(db.documents, { as: "documents_offers" });
db.documents.belongsTo(db.offers);

db.categories.hasOne(db.documents);
db.documents.belongsTo(db.categories);

db.countries.hasOne(db.documents);
db.documents.belongsTo(db.countries);

db.ROLES = ["user", "admin", "visitor"];

module.exports = db;
