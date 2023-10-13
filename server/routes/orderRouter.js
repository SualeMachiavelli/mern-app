const router = require("express").Router();

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router
  .route("/")
  .post(authController.authorize, orderController.createOrder)
  .get(orderController.getOrders);

module.exports = router;
