const { Router } = require("express");
const indexRouter = Router();
const { checkAuthenticated } = require("../middleware/auth");
const { prisma } = require("../passport-config");

indexRouter.get("/", checkAuthenticated, async (req, res) => {
  try {
    const rootFolder = await prisma.folder.findFirst({
      where: {
        name: "root",
        userId: req.user.id,
      },
    });

    res.render("index", {
      rootFolder: rootFolder,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = indexRouter;
