const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/searchjobsusingkeywords").SearchJobs);
router.route('/').get(require("../Controllers/searchjobsusingkeywords").SearchJobsGet);
module.exports = router;