const express = require("express");
const router = express.Router();
router.route('/').get(require("../Controllers/recommendforperson").RecommendForPerson);
module.exports = router;