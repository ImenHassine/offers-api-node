module.exports = (app) => {
  const document = require("../controllers/document.controller");
  const validate = require("../middleware/validation");
  const filter = require("../middleware/filter");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const { putSchema } = require("../schema/document");

  const router = require("express").Router();

  // router.get('/', document.findAll);
  router.post("/", [validate(createdSchema)], document.add);

  router.get("/", filter(), document.findAll);

  router.get("/:id", document.findOne);

  router.delete("/:id", validate(deletedSchema), document.delete);

  router.patch("/:id", [validate(updatedSchema)], document.patch);

  app.use("/api/document", router);
};
