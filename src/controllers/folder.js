const { prisma } = require("../passport-config");

exports.folderPut = async (req, res) => {
  try {
    await prisma.folder.create({
      data: {
        name: "new folder",
        userId: req.user.id,
      },
    });
    console.log(`${req.user} (id: ${req.user.id}) has created a new folder`);
  } catch (error) {
    console.log(error);
  }
};
