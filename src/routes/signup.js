const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/signup");
const auth = require("../middleware/auth");
router.get("/sign-up", auth.checkNotAuthenticated, signUpController.signUpForm);
router.post("/sign-up", signUpController.signUpPut);

module.exports = router;
