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
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        folders: {
          create: [{ name: "root" }],
        },
      },
    });
    console.log(req.body);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
