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

router.patch(
  "/update-folder/:id",
  auth.checkAuthenticated,
  folderController.folderPatch
);

router.delete(
  "/delete-folder/:id",
  auth.checkAuthenticated,
  folderController.folderDelete
);

module.exports = router;
