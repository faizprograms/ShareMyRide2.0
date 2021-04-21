const express = require("express");
//conroller
const userController = require("../controllers/user");
//middleware
const {
  authUserHandler
} = require("../middleware/authHandler");
const asyncHandler = require("../middleware/asyncHandler");
const {
  checkBodyUserHandler,
  checkBodyRideHandler
} = require("../middleware/checkBodyHandler");
const sanitizeHTML = require("../middleware/sanitizeHTML");

//util
const {
  generateToken,
  forgetPassword,
  AppError,
  verfiyMail,
  dbErrorHandler
} = require("../util/util");


const router = express.Router();

//route for /user
router.get("/profile", authUserHandler, userController.get);
router.post("/profile", sanitizeHTML, authUserHandler, checkBodyUserHandler, asyncHandler(userController.post));

router.get("/book/ride/:id", authUserHandler, asyncHandler(userController.bookARide));
router.post("/book/ride/", sanitizeHTML, authUserHandler, asyncHandler(userController.postBookARide));

router.post("/unbook/ride/", sanitizeHTML, authUserHandler, asyncHandler(userController.unBookMyRide));
router.get("/booked/rides/", authUserHandler, asyncHandler(userController.getMyBookedRides));

router.post("/set/alert/", sanitizeHTML, authUserHandler, asyncHandler(userController.setAlertOnSearch));
router.post("/unset/alert/:id", sanitizeHTML, authUserHandler, asyncHandler(userController.unSetAlertOnSearch));



router.get("/verifiy/email/:id", asyncHandler(userController.emailVerified));

router.get("/reset/password/:id", userController.resetPassword);
router.post("/reset/password/:id", sanitizeHTML, asyncHandler(userController.postResetPassword));

router.get("/forget/password/", userController.forgetPassword);
router.post("/forget/password/", sanitizeHTML, asyncHandler(userController.postForgetPassword));

router.get("/logout", authUserHandler, userController.logout);

module.exports = router;