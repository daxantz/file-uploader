const { Router } = require("express");
const indexRouter = Router();
const { checkAuthenticated } = require("../middleware/auth");
const { prisma } = require("../passport-config");

indexRouter.get("/", checkAuthenticated, async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const files = await prisma.file.findMany({
      where: { userId: req.user.id },
    });
    const userWithFilesAndFolders = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        files: true,
        folders: true,
      },
    });
    console.log(userWithFilesAndFolders);
    res.render("index", { user: userWithFilesAndFolders });
  } catch (error) {
    console.log(error);
  }
});

module.exports = indexRouter;
