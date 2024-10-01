const { Router } = require("express");
const router = Router();
const loginController = require("../controllers/login");
const auth = require("../middleware/auth");
const passport = require("passport");
router.get("/login", auth.checkNotAuthenticated, loginController.loginFormGet);
router.post(
  "/login",
  auth.checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.delete("/logout", auth.checkAuthenticated, loginController.logout);

module.exports = router;
