const { Category } = require("../../models");

const getAllCategories = async (_, res) => {
    const expenses = await Category.find({ type: "expense" });
    const income = await Category.find({ type: "income" });

    res.json({
        status: "success",
        code: 200,
        data: { expenses, income },
    });
};

module.exports = getAllCategories;
