const { prisma } = require("../passport-config");
exports.folderPageGet = async (req, res) => {
  try {
    const { id } = req.params;
    const currentFolder = await prisma.folder.findUnique({
      where: {
        id: Number(id),
      },
    });

    const currentFolders = await prisma.folder.findMany({
      where: { parentFolderId: Number(id) },
    });
    res.render("folder", {
      folder: currentFolder,
      currentFolders: currentFolders,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.folderPut = async (req, res) => {
  try {
    const rootFolder = await prisma.folder.findFirst({
      where: { name: "root", userId: req.user.id },
    });
    await prisma.folder.create({
      data: {
        name: "new folder",
        userId: req.user.id,
        parentFolderId: Number(req.params.id),
      },
    });
    console.log("folder added");
    res.redirect(`/storage/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};
