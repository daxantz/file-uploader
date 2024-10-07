const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fileController = require("../controllers/file");

router.get("/upload-file", auth.checkAuthenticated, fileController.fileFormGet);
router.post(
  "/upload-file",
  upload.single("uploaded_file"),
  fileController.filePut
);

module.exports = router;
