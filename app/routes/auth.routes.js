const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const validate = require("../middleware/validation");
const { schema } = require("../schema/signup");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      validate(schema),
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
