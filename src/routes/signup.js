const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/signup");
router.get("/sign-up", signUpController.signUpForm);
router.post("/sign-up", signUpController.signUpPut);

module.exports = router;
