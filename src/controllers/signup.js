const { prisma } = require("../passport-config");
const bcrypt = require("bcryptjs");
exports.signUpForm = (req, res) => {
  res.render("signup");
};

exports.signUpPut = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword },
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
