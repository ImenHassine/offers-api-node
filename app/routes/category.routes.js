module.exports = (app) => {
  const category = require("../controllers/category.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/category");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const filter = require('../middleware/filter');
  const router = require("express").Router();

  router.post("/", [validate(schema), validate(createdSchema)], category.add);
  router.get("/", filter(), category.findAll);
  router.get("/:id", category.findOne);
  router.delete("/:id", validate(deletedSchema), category.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    category.patch
  );

  app.use("/api/category", router);
};
