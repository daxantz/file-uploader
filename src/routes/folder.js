const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const folderController = require("../controllers/folder");

router.post(
  "/create-folder",
  auth.checkAuthenticated,
  folderController.folderPut
);

module.exports = router;
