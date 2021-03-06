const multer = require("multer");
const path = require("path");
const status = require("../helpers/response.helper");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/profile");
  },
  filename: (req, file, cb) => {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const fileFilter = async (req, file, cb) => {
  const ext = path.extname(file.originalname);

  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"), "test");
  }
  cb(null, true);
};

const limits = {
  fileSize: 1 * 1024 * 1024,
};

const uploadUser = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("picture");

const upload = (req, res, next) => {
  uploadUser(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(multer.MulterError);
      return status.ResponseStatus(res, 400, err.message);
    } else if (err) {
      console.log(err);
      return status.ResponseStatus(res, 400, "Failed to upload image");
    }
    next();
  });
};

module.exports = upload;
