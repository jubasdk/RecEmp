const express = require("express");
const router = express.Router();

router.route('/').get(require("../Controllers/signup").SendSignupPage);
router.route('/').post(require("../Controllers/signup").ConfirmSignUp);
router.route('/company').get(require("../Controllers/signup").SendCompanySignupPage);
router.route('/company').post(require("../Controllers/signup").ConfirmCompanySignUp);

module.exports = router;