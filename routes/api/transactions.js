const express = require("express");

const { transactions: ctrl } = require("../../controller");
const { auth, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.post("/", auth, ctrlWrapper(ctrl.add));
router.get("/categories", auth, ctrlWrapper(ctrl.getAllCategories));
router.post("/statistics", auth, ctrlWrapper(ctrl.getStatistics));

module.exports = router;
