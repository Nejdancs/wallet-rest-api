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
    {
      $project: {
        categoryId: "$_id._id",
        categoryName: "$_id.name",
        amount: "$totalAmount",
        _id: 0,
      },
    },
    { $sort: { categoryName: 1 } },
  ]);

  const totalExpenses = expenses.reduce((acc, elememt) => {
    return acc + elememt.amount;
  }, 0);

  const income = await Transaction.aggregate([
    { $match: { owner: _id, type: "income", month, year } },
    { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
  ]);

  const totalIncome = income.reduce(
    (acc, elememt) => acc + elememt.totalAmount,
    0
  );

  const actDates = await Transaction.aggregate([
    { $match: { owner: _id } },
    {
      $group: {
        _id: "$year",
        monthes: { $addToSet: "$month" },
      },
    },
    {
      $project: {
        year: "$_id",
        monthes: 1,
        _id: 0,
      },
    },
    { $sort: { year: 1 } },
  ]);

  console.log(actDates);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      expenses,
      totalExpenses,
      totalIncome,
      actDates,
    },
  });
};

module.exports = getStatistics;
