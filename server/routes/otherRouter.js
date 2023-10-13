const router = require("express").Router();
const otherController = require("../controllers/otherController");

router
  .route("/")
  .post(
    otherController.upload.single("photoa"),
    otherController.upload.single("photoc"),
    otherController.upload.single("photop"),
    otherController.uploadOther
  );

module.exports = router;
