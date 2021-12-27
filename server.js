const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const log4js = require("log4js");
const log4j = require("./app/config/configLog4js.js");
const key = require("./app/config/key.config");

require("dotenv/config");

const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./docs/api_swagger.json");
require("events").EventEmitter.defaultMaxListeners = 15;
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(log4js.connectLogger(log4j.loggercheese, { level: "info" }));

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;

// catch the SyntaxError:
app.use(function (err, req, res, next) {
  res.status(500).send("Something broke!");
});
db.sequelize.sync();

// db.sequelize.sync({alter:true});
// //force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.redirect("/docs");
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/offer.routes")(app);
require("./app/routes/subscription.routes")(app);


// initial()
initiateAdmin();
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  log4j.loggerinfo.info(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "visitor",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

async function initiateAdmin() {
  const username = key.USERNAME;
  const email = key.EMAIL;
  const password = key.PASSWORD;
  console.log("username", username);
  console.log("email", email);
  console.log("password", password);

  const userExistsaleusername = await User.findOne({
    where: { deleted: 0, username: username },
    attributes: { exclude: ["deleted"] },
    logging: function (msg) {
      log4j.loggerdebug.debug(msg);
    },
  });
  const userExistsaleEmail = await User.findOne({
    where: { deleted: 0, email: email },
    attributes: { exclude: ["deleted"] },
    logging: function (msg) {
      log4j.loggerdebug.debug(msg);
    },
  });
  if (
    !userExistsaleusername &&
    !userExistsaleEmail &&
    username &&
    password &&
    email
  ) {
    User.create({
      username: username,
      password: password,
      email: email,
      firstname: "admin1",
      activate: true,
      lastname: "admin1",
    }).then((user) => {
      user.setRoles([3]).then(() => {
        console.log("Admin has been created with id=" + user.id);
      });
    });
  } else {
    console.log("***********************************");
    console.log("Admin has been already created");
    console.log("***********************************");
  }
}
