const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/viewapplied").ViewCustomersApplied);
module.exports = router;