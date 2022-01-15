module.exports = (app) => {
  const country = require("../controllers/country.controller");
  const validate = require("../middleware/validation");
  const { schema, patchSchema } = require("../schema/country");
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
  // const upload = multer();
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "./test");
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname);
  //   },
  // });

  // /* defined filter */
  // const fileFilter = (req, file, cb) => {
  //   console.log("file in fileFilter", file);
  //   if (file.length == 0) {
  //     cb(new Error("File should not be empty"), false);
  //   }
  //   if (
  //     file.mimetype === "image/png" ||
  //     file.mimetype === "image/jpg" ||
  //     file.mimetype === "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
  //   }
  // };

  // const upload = multer({ storage: storage, fileFilter: fileFilter });
  router.post(
    "/",
    [
      upload.single("icon"),
      // upload.none(),
      // upload.any(),
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
    country.add
  );
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
