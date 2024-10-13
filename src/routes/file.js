const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fileController = require("../controllers/file");

router.get("/upload-file", auth.checkAuthenticated, fileController.fileFormGet);
router.post(
  "/upload-file/:id",
  upload.single("uploaded_file"),
  fileController.filePut
);
router.patch(
  "/update-file/:id",
  auth.checkAuthenticated,
  fileController.filePatch
);

router.get("/file/:id", auth.checkAuthenticated, fileController.getFileDetails);
router.get(
  "/download/:id",
  auth.checkAuthenticated,
  fileController.downloadFile
);
router.delete(
  "/delete-file/:id",
  auth.checkAuthenticated,
  fileController.fileDelete
);

module.exports = router;
