const express = require("express");
const router = express.Router();
router.route('/').get(require("../Controllers/login").sendLoginPage);
router.route('/').post(require("../Controllers/login").makeLogin);
module.exports = router;