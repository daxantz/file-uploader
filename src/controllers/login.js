exports.loginFormGet = (req, res) => {
  res.render("login");
};

exports.logout = (req, res) => {
  console.log(`logging ${req.user.name} out`);
  if (!req.user) return res.redirect("/");
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/login");
  });
};
