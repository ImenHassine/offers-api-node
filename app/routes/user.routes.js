const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/visitor",
    [authJwt.verifyToken, authJwt.isVisitor],
    controller.visitorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isUserOrAdminOrVisitor],
    controller.findOneUser
  );
  app.put(
    "/api/activate/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.activateUser
  );
  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.get(
    "/api/user",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.patch(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isUserOrAdminOrVisitor],
    controller.patchUser
  );
  app.put(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updatedUserByAdmin
  );

  app.post("/api/user/forgot_password", controller.forgot);
  app.post("/api/user/reset_password", controller.reset);

  app.post(
    "/api/user/change_password",
    [authJwt.verifyToken, authJwt.isUserOrAdminOrVisitor],
    controller.modify
  );
};
