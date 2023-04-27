const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./upload/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const Upload = multer({
  storage: multerStorage,
});

module.exports = Upload;