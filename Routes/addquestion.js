const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/addquestion").AddQuestion);
module.exports = router;