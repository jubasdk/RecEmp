const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/deletejob").DeleteJob);
module.exports = router;