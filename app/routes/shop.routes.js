module.exports = (app) => {
  const shop = require("../controllers/shop.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/shop");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
    filesSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();
  const multer = require("multer");
  const upload = multer({ dest: "documents/shop" });

  router.post(
    "/",
    [
      upload.array("images"),
      (req, res, next) => {
        req.body.files = req.files;
        next();
      },
      validate(schema),
      validate(createdSchema),
      validate(filesSchema),
    ],
    shop.add
  );
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
