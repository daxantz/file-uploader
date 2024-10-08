const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const folderController = require("../controllers/folder");
router.get(
  "/storage/:id",
  auth.checkAuthenticated,
  folderController.folderPageGet
);
router.post(
  "/create-folder/:id",
  auth.checkAuthenticated,
  folderController.folderPut
);

module.exports = router;
