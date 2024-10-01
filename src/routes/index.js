const { Router } = require("express");
const indexRouter = Router();
const { checkAuthenticated } = require("../middleware/auth");

indexRouter.get("/", checkAuthenticated, async (req, res) => {
  res.render("index", { user: req.user });
});

module.exports = indexRouter;
