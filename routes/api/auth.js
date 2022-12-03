const express = require("express");

const { auth: ctrl } = require("../../controller");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
