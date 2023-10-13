const router = require("express").Router({ mergeParams: true });

const cardController = require("../controllers/giftCardController");
const authController = require("../controllers/authController");
const multer = require("../controllers/multer");
const cartRouter = require("../routes/cartRouter");

router.use("/:id/cart", cartRouter);

router
  .route("/")
  .post(
    authController.authorize,
    multer.multipleUploads,
    cardController.createGiftCard
  )
  .get(cardController.getCards);
router.get("/carts", authController.authorize, cardController.getAddedCart);
router
  .route("/:id")
  .get(cardController.getCard)
  .post(authController.authorize, cardController.addToCart)
  .delete(cardController.deleteCard);

router.get("/:id/related", cardController.getRelatedCards);

module.exports = router;
