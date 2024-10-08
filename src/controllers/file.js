const { prisma } = require("../passport-config");

exports.fileFormGet = (req, res) => {
  res.render("addfile");
};

exports.filePut = async (req, res) => {
  try {
    // const file = await prisma.file.create({
    //   data: {
    //     name: req.file.originalname,
    //     userId: req.user.id,
    //     mimetype: req.file.mimetype,
    //     destination: req.file.destination,
    //     filename: req.file.filename,
    //     path: req.file.path,
    //     size: req.file.size,
    //     parentFolderId: Number(req.params.id),
    //   },
    // });
    const currentFolder = await prisma.folder.update({
      where: { id: Number(req.params.id) },
      data: {
        files: {
          create: {
            name: req.file.originalname,
            userId: req.user.id,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            parentFolderId: Number(req.params.id),
          },
        },
      },
    });

    console.log(`this file has been uploaded to: ${currentFolder.name}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
