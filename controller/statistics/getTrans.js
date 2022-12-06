const { User, Transaction } = require("../../models");

const getTrans = async (req, res) => {
  const { _id } = req.user;

  const transactions = await Transaction.find({ owner: _id });

  const { balance } = await User.findById(_id);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      transactions,
      balance,
    },
  });
};

module.exports = getTrans;
