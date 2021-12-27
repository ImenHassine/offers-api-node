module.exports = (app) => {
  const subscription = require("../controllers/subscription.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/subscription");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();

  router.post(
    "/",
    [validate(schema), validate(createdSchema)],
    subscription.add
  );
  router.get("/", filter(), subscription.findAll);
  router.get("/:id", subscription.findOne);
  router.delete("/:id", validate(deletedSchema), subscription.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    subscription.patch
  );

  app.use("/api/subscription", router);
};
