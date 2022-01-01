const path = require('path');
const crypto = require("crypto");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const {Person} = require("../models/schema");
exports.sendUploadPage = (req , res , next) => {
    res.sendFile(path.join(__dirname , '../Views/upload.html'));
}

exports.uploadCV = (req , res , next) => {
    res.sendFile(path.join(__dirname , '../Views/login.html'));
}

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const query = { "personID" : require("../Controllers/signup").UserID };
          Person.updateOne(query , {$set: { personCVfileName: filename}} , function(err, res) {
              if (!err){
                console.log("file name : " + filename + " CV set succefully");
              }
          });
          const fileInfo = {
            filename: filename,
            bucketName: "CVs"
          };
          resolve(fileInfo);
        });
      });
    }
});
exports.upload = multer({
    storage
});