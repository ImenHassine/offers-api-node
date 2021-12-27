module.exports = (app) => {
  const offer = require("../controllers/offer.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/offer");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();

  router.post("/", [validate(schema), validate(createdSchema)], offer.add);
  router.get("/", filter(), offer.findAll);
  router.get("/:id", offer.findOne);
  router.delete("/:id", validate(deletedSchema), offer.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    offer.patch
  );

  app.use("/api/offer", router);
};
