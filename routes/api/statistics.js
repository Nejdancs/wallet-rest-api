const express = require("express");
const { statistics: ctrl } = require("../../controller");
const { auth, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post("/", auth, ctrlWrapper(ctrl.getStatistics));

module.exports = router;
