const router = require("express").Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router
  .route("/")
  .post(authController.authorize, reviewController.createReview)
  .get(authController.authorize, reviewController.getReviews);

router.route("/:flowerId");

module.exports = router;
