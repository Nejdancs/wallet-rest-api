const { Category } = require("../../models");

const getAllCategories = async (req, res) => {
    const { id } = req.user;

    const expenses = await Category.find({
        type: "expense",
        $or: [{ owner: id }, { owner: { $exists: false } }],
    }).select("_id type name");

    const income = await Category.find({
        type: "income",
        $or: [{ owner: id }, { owner: { $exists: false } }],
    }).select("_id type name");

    res.json({
        status: "success",
        code: 200,
        data: { expenses, income },
    });
};

module.exports = getAllCategories;
