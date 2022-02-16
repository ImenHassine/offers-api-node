module.exports = (app) => {
  const offer = require("../controllers/offer.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/offer");
  const {
    createdSchema,
    updatedSchema,
    deletedSchema,
    filesSchema,
  } = require("../schema/common");
  const filter = require("../middleware/filter");
  const router = require("express").Router();
  const multer = require("multer");
  const upload = multer({ dest: "documents/offer" });

  router.post(
    "/",
    [
      upload.array("images"),
      (req, res, next) => {
        console.log("req.headers", req.headers);
        console.log("req.body", req.body);
        console.log("req.files", req.files);
        req.body.files = req.files;
        next();
      },
      validate(schema),
      validate(createdSchema),
      validate(filesSchema),
    ],
    offer.add
  );
  router.get("/fr", filter(), offer.findAll);
  router.get("/ar", filter(), offer.findAll);
  router.get("/eng", filter(), offer.findAll);

  router.get("/fr/:id", offer.findOne);
  router.get("/eng/:id", offer.findOne);
  router.get("/ar/:id", offer.findOne);

  router.delete("/:id", validate(deletedSchema), offer.delete);
  router.patch(
    "/:id",
    [validate(patchSchema), validate(updatedSchema)],
    offer.patch
  );

  app.use("/api/offer", router);
};
