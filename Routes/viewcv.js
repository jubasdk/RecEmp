const express = require("express");
const router = express.Router();
router.route('/:filename').get(require("../config/db").ViewCV);
module.exports = router;