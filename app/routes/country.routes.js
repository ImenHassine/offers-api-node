module.exports = (app) => {
  const country = require("../controllers/country.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/country");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();

  router.post("/", [validate(schema), validate(createdSchema)], country.add);
  router.get("/", filter(), country.findAll);
  router.get("/:id", country.findOne);
  router.delete("/:id", validate(deletedSchema), country.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    country.patch
  );

  app.use("/api/country", router);
};
