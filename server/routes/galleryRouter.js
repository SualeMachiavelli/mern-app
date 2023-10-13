const router = require("express").Router();
const galleryController = require("../controllers/galleryController");

router
  .post(
    "/",
    galleryController.multipleUploads.fields([
      { name: "pictures", maxCount: 15 },
    ]),
    galleryController.createGallery
  )
  .get("/", galleryController.getGallery);

module.exports = router;
