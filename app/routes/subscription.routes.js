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
  router.get("/fr", filter(), subscription.findAll);
  router.get("/ar", filter(), subscription.findAll);
  router.get("/eng", filter(), subscription.findAll);

  router.get("/fr/:id", subscription.findOne);
  router.get("/eng/:id", subscription.findOne);
  router.get("/ar/:id", subscription.findOne);

  router.delete("/:id", validate(deletedSchema), subscription.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    subscription.patch
  );

  app.use("/api/subscription", router);
};
