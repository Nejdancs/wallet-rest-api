const express = require("express");
const { statistics: ctrl } = require("../../controller");
const { auth, ctrlWrapper } = require("../../middlewares");
const addTrans = require("../../controller/statistics/addTrans");
const getTrans = require("../../controller/statistics/getTrans");

const router = express.Router();

router.post("/", auth, ctrlWrapper(ctrl.getStatistics));
router.post("/addTrans", auth, ctrlWrapper(addTrans));
router.get("/getTrans", auth, ctrlWrapper(getTrans));

module.exports = router;
