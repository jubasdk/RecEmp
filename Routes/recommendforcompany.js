const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/recommendforcompany").RecommendForCompany);
module.exports = router;