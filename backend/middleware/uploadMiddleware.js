const path = require("path");
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "--" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
