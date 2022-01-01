const express = require("express");
const router = express.Router();

router.route('/').get(require("../Controllers/home").sendHomePage);

module.exports = router;