module.exports = (app) => {
  const category = require("../controllers/countryCategory.controller");
  const validate = require("../middleware/validation");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();

  router.post("/", [validate(createdSchema)], category.add);
  router.get("/", filter(), category.findAll);
  router.get("/:id", category.findOne);
  router.delete("/:id", validate(deletedSchema), category.delete);
  router.patch("/:id", [validate(updatedSchema)], category.patch);

  app.use("/api/country-category", router);
};
