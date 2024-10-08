require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("express-flash");
const { initialize, prisma } = require("./src/passport-config.js");
const indexRouter = require("./src/routes/index.js");
const signupRouter = require("./src/routes/signup.js");
const loginRouter = require("./src/routes/login.js");
const fileRouter = require("./src/routes/file.js");
const folderRouter = require("./src/routes/folder.js");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

initialize(passport);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(indexRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(fileRouter);
app.use(folderRouter);

async function main() {
  app.listen(3000, (req, res) => {
    console.log("SERVER running on port 3000");
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
