const express = require("express");
const { statistics: ctrl } = require("../../controller");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const addTrans = require("../../controller/statistics/addTrans");
const getTrans = require("../../controller/statistics/getTrans");
const { joiStatisticFilterSchema } = require("../../models");

const router = express.Router();

router.post(
  "/",
  auth,
  validation(joiStatisticFilterSchema),
  ctrlWrapper(ctrl.getStatistics)
);

// временно
router.post("/addTrans", auth, ctrlWrapper(addTrans));
router.get("/getTrans", auth, ctrlWrapper(getTrans));

module.exports = router;
