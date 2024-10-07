const { prisma } = require("../passport-config");

exports.fileFormGet = (req, res) => {
  res.render("addfile");
};

exports.filePut = async (req, res) => {
  try {
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        userId: req.user.id,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
    });
    console.log(`this file has been uploaded, file: ${req.file}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
