const express = require("express");

const { auth: ctrl } = require("../../controller");
const { auth, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
