const { User, Transaction } = require("../../models");

const addTrans = async (req, res) => {
  const { type, category, amount, date, comment } = req.body;
  const { _id } = req.user;

  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();

  const newTrans = await Transaction.create({
    owner: _id,
    type,
    category,
    amount,
    date,
    comment,
    month,
    year,
  });

  const user = await User.findById(_id);

  user.balance =
    type === "income" ? user.balance + amount : user.balance - amount;

  await user.save();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      trans: newTrans,
      balance: user.balance,
    },
  });
};

module.exports = addTrans;
