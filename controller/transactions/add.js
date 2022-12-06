const { Transaction, User } = require("../../models");

const add = async (req, res) => {
    const body = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    user.balance = body.type === "income" ? user.balance + body.amount : user.balance - body.amount;

    const data = await Transaction.create({ ...body, owner: id, balance: user.balance });

    await user.save();

    const resData = await Transaction.findOne(data)
        .populate("owner", "_id name email balance")
        .populate("category", "_id name type");

    res.status(201).json({ status: "success", code: 201, data: resData });
};

module.exports = add;
