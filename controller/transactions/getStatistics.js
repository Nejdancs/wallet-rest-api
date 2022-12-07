const { Transaction } = require("../../models");

const getStatistics = async (req, res) => {
  const { _id } = req.user;
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } =
    req.body;

  const expenses = await Transaction.aggregate([
    { $match: { owner: _id, type: "expense", month, year } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryName",
      },
    },
    { $unwind: { path: "$category" } },
    {
      $group: {
        _id: "$categoryName",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpenses = expenses.reduce((acc, elememt) => {
    return acc + elememt.totalAmount;
  }, 0);

  const income = await Transaction.aggregate([
    { $match: { owner: _id, type: "income", month, year } },
    { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
  ]);

  const totalIncome = income.reduce(
    (acc, elememt) => acc + elememt.totalAmount,
    0
  );

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      expenses,
      totalExpenses,
      totalIncome,
    },
  });
};

module.exports = getStatistics;
