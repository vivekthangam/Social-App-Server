const express = require("express");
const router = express.Router();
const { SignIn, SignOut, SignUp } = require('../Middlewares/Auth')
const verifySignUp = require("../Middlewares/VerifySignUp")

router.route("/SignUp").post([
    verifySignUp
], SignUp);

router.route("/SignIn").post(SignIn);
router.route("/SignOut").post(SignOut);

module.exports = router;