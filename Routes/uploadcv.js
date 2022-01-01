const express = require("express");
const {upload} = require("../models/schema");
const router = express.Router();
router.route('/').get(require('../Controllers/uploadcv').sendUploadPage);
router.route('/').post(require('../Controllers/uploadcv').upload.single("file") , require('../Controllers/uploadcv').uploadCV);
module.exports = router;