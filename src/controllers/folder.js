const { prisma } = require("../passport-config");
exports.folderPageGet = async (req, res) => {
  try {
    const { id } = req.params;
    //finds specific folder and all its files/folders
    const currentFolderWithFiles = await prisma.folder.findUnique({
      where: {
        id: Number(id),
      },
      include: { files: true },
    });
    //returns all sub-folders of the current folder
    const currentFolders = await prisma.folder.findMany({
      where: { parentFolderId: Number(id) },
      include: { files: true },
    });
    console.log(currentFolderWithFiles);
    res.render("folder", {
      folder: currentFolderWithFiles,
      currentFolders: currentFolders,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.folderPut = async (req, res) => {
  try {
    const { folderName } = req.body;
    const rootFolder = await prisma.folder.findFirst({
      where: { name: "root", userId: req.user.id },
    });
    const folder = await prisma.folder.create({
      data: {
        name: folderName,
        userId: req.user.id,
        parentFolderId: Number(req.params.id),
      },
    });
    console.log("folder added, folder: ", folder.name);
    res.redirect(`/storage/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.folderPatch = async (req, res) => {
  try {
    const { newName } = req.body;
    const folder = await prisma.folder.update({
      where: { id: Number(req.params.id) },
      data: { name: newName },
    });
    console.log(`${folder} new name is ${newName}`);
    res.redirect(`/storage/${folder.parentFolderId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.folderDelete = async (req, res) => {
  try {
    const deleteFolder = await prisma.folder.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    console.log("a folder  has been deleted: ", deleteFolder);
    res.redirect(`/storage/${deleteFolder.parentFolderId}`);
  } catch (error) {
    console.log(error);
  }
};
