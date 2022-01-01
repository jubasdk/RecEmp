const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/addanswer").AddAnswer);
module.exports = router;