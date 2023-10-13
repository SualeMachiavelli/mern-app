const router = require("express").Router();

const flowerController = require("../controllers/flowerController");
const multer = require("../controllers/multer");
const homeUpload = require("../controllers/homeImageUpload");
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const reviewRouter = require("../routes/reviewRouter");

router.use("/:flowerId/reviews", reviewRouter);

router
  .route("/")
  .post(
    authController.authorize,
    multer.multipleUploads,
    flowerController.postFlower
  )
  .get(flowerController.getFlowers);

router
  .route("/home")
  .post(
    authController.authorize,
    homeUpload.homeImagesUpload,
    homeController.uploadImages
  )
  .get(homeController.getHome);

router
  .route("/:id")
  .get(flowerController.getFlower)
  .post(authController.authorize, flowerController.addToCart)
  .delete(flowerController.deleteFlower);
router.get("/:id/related", flowerController.getRelatedFlowers);

module.exports = router;
