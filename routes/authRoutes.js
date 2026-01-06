const express = require("express");
const router = express.Router();

const {
  register,
  login,
  viewProfile,
  updateProfile,
  changePassword,
  logout
} = require("../controllers/authController");

const authSession = require("../middleware/authSession");



router.post("/register", register);
router.post("/login", login);

/* PROTECTED ROUTES  */
router.get("/profile", authSession, viewProfile);
router.post("/update-profile", authSession, updateProfile);
router.post("/change-password", authSession, changePassword);
router.get("/logout", logout);

module.exports = router;
