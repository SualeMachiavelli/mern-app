const router = require("express").Router({ mergeParams: true });

const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

router
  .route("/")
  .post(authController.authorize, cartController.addToCart)
  .get(authController.authorize, cartController.getAddedItem);
router.get("/all", cartController.getAllCartItems);

router.route("/").get(authController.authorize, cartController.getCartItems);

router.patch("/:id", authController.authorize, cartController.updateCartItem);
router.route("/:id").delete(cartController.removeCartItem);
router.get("/:id/card", cartController.checkIfAddedCard);
router.get("/:id/flower", cartController.checkIfAddedFlower);
module.exports = router;
