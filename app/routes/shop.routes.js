module.exports = (app) => {
  const shop = require("../controllers/shop.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/shop");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();

  router.post("/", [validate(schema), validate(createdSchema)], shop.add);
  router.get("/", filter(), shop.findAll);
  router.get("/:id", shop.findOne);
  router.delete("/:id", validate(deletedSchema), shop.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    shop.patch
  );

  app.use("/api/shop", router);
};
