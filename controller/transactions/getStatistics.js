const { Transaction } = require("../../models");

const getStatistics = async (req, res) => {
    const { _id } = req.user;
    const { month, year } = req.body;

    const expenses = Transaction.aggregate([
        { $match: { owner: _id, type: "expense", month, year } },
        { $group: { _id: null, totalSum: { $sum: "$amount" } } },
        {
            $project: { _id: null, category: "_id.category", totalSum: "$totalSum" },
        },
    ]);

    const income = Transaction.aggregate([
        { $match: { owner: _id, type: "income", month, year } },
        { $group: { _id: null, totalSum: { $sum: "$amount" } } },
        {
            $project: { _id: null, category: "_id.category", totalSum: "$totalSum" },
        },
    ]);

    res.json({
        status: "success",
        code: 200,
        data: { expenses, income },
    });
};

module.exports = getStatistics;
