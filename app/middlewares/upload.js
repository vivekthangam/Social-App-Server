const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const dbConfig = require("../config/db.config");

var storage = new GridFsStorage({
  url: dbConfig.uri,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-chatMe-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-chatMe-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;