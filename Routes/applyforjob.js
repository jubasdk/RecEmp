const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/applyforjob").ApplyForJob);
module.exports = router;