const { prisma } = require("../passport-config");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://fpmqnfpdcjpbelxbhpuv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.fileFormGet = (req, res) => {
  res.render("addfile");
};

exports.filePut = async (req, res) => {
  try {
    const uniqueName = `${Date.now()}_${req.file.originalname}`; //gives each file a unique name to allow mutiple files of the same name to be uploaded to supabase12
    console.log(req.file.buffer);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("files")
      .upload(`uploads/${uniqueName}`, req.file.buffer);

    if (uploadError) {
      console.error("error uploading ", uploadError);
      throw uploadError;
    }
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        userId: req.user.id,
        size: req.file.size,
        parentFolderId: Number(req.params.id),
        path: uploadData.path,
      },
    });
    const currentFolder = await prisma.folder.update({
      where: { id: Number(req.params.id) },
      data: {
        files: {
          connect: { id: file.id },
        },
      },
    });

    console.log(`${file.name} has been uploaded to: ${currentFolder.name}`);
    res.redirect(`/storage/${file.parentFolderId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.filePatch = async (req, res) => {
  try {
    const { new_file_name } = req.body;
    const currentFile = await prisma.file.update({
      where: { id: Number(req.params.id) },
      data: { name: new_file_name },
    });
    res.redirect(`/storage/${currentFile.parentFolderId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.fileDelete = async (req, res) => {
  try {
    const deleteFile = await prisma.file.delete({
      where: { id: Number(req.params.id) },
    });

    console.log("a file  has been deleted: ", deleteFile);
    res.redirect(`/storage/${deleteFile.parentFolderId}`);
  } catch (error) {
    console.log(error);
  }
};

exports.getFileDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({ where: { id: Number(id) } });
    console.log(file);
    res.render("file-details", { file: file });
  } catch (error) {
    console.log(error);
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await prisma.file.findUnique({ where: { id: Number(id) } });
    // console.log(file);
    // res.download(`${file.path}`, (err) => {
    //   if (err) {
    //     res.status(404).send("File not found");
    //   }
    // });
    const { data, error } = supabase.storage
      .from("files")
      .getPublicUrl(`uploads/${file.name}`);
    console.log(data.publicUrl);
    console.log(file.path);
    if (error) {
      console.error("problem downloading file", error);
      throw error;
    }

    res.redirect(`${data.publicUrl}?download=${file.name}`); //download query parameter forces file download, if not included client only redirects to file without downloading it
  } catch (error) {
    console.log(error);
  }
};
