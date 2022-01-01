const express = require("express");
const router = express.Router();
router.route('/').post(require("../Controllers/qustionsanswers").SendQuestionsAnswersPage);
module.exports = router;