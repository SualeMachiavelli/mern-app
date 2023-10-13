const router = require("express").Router();

const buoquetController = require("../controllers/buoquetController");

router
  .route("/")
  .post(
    buoquetController.upload.fields([
      { name: "singlephotos", maxCount: 10 },
      { name: "elegantphotos", maxCount: 10 },
      { name: "classiquephotos", maxCount: 10 },
      { name: "deluxephotos", maxCount: 10 },
    ]),
    buoquetController.uploadBuoquet
  )
  .get(buoquetController.getBuoquets);

module.exports = router;
