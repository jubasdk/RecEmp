const express = require("express");
const router = express.Router();
router.route('/').get(require("../Controllers/postajob").SendPostAJob);
router.route('/').post(require("../Controllers/postajob").PostAJob);
module.exports = router;