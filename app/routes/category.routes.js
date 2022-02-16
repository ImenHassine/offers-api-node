module.exports = (app) => {
  const category = require("../controllers/category.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/category");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
    fileSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();
  const multer = require("multer");
  const upload = multer({ dest: "documents/images" });

  router.post(
    "/",
    [
      upload.single("icon"),
      (req, res, next) => {
        console.log("req.headers", req.headers);
        console.log("req.body", req.body);
        console.log("req.file", req.file);
        req.body.file = req.file;
        next();
      },
      validate(schema),
      validate(createdSchema),
      validate(fileSchema),
    ],
    category.add
  );
  router.get("/fr", filter(), category.findAll);
  router.get("/eng", filter(), category.findAll);
  router.get("/ar", filter(), category.findAll);

  router.get("/fr/:id", category.findOne);
  router.get("/eng/:id", category.findOne);
  router.get("/ar/:id", category.findOne);

  router.delete("/:id", validate(deletedSchema), category.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    category.patch
  );

  app.use("/api/category", router);
};
