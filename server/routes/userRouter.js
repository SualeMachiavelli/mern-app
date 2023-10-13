const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updatepassword",
  authController.authorize,
  userController.updatePassword
);

router.patch(
  "/updateMe",
  authController.authorize,
  authController.uploadUserPhoto,
  userController.updateData
);
router.route("/").get(userController.getUsers);

router.get(
  "/account",
  authController.authorize,
  userController.getAccount,
  userController.getUser
);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(authController.authorize, userController.deleteAccount);

module.exports = router;
