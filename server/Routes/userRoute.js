const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../Controller/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
module.exports = router;
