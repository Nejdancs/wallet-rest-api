const express = require("express");
const { getCurrency: ctrl } = require("../../controller");
const { ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getCurrency));

module.exports = router;
