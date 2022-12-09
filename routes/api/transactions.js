const express = require("express");

const { transactions: ctrl } = require("../../controller");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const {
    joiStatisticFilterSchema,
    joiCreateTransactionSchema,
    joiCategorySchema,
} = require("../../models");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.post("/", auth, validation(joiCreateTransactionSchema), ctrlWrapper(ctrl.add));
router.get("/categories", auth, ctrlWrapper(ctrl.getAllCategories));
router.post("/categories", auth, validation(joiCategorySchema), ctrlWrapper(ctrl.addCategory));
router.post(
    "/statistics",
    auth,
    validation(joiStatisticFilterSchema),
    ctrlWrapper(ctrl.getStatistics)
);

module.exports = router;
