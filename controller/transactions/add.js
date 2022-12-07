const { Transaction, User, Category } = require("../../models");
const { BadRequest } = require("http-errors");

const add = async (req, res) => {
    const body = req.body;
    const { id } = req.user;

    const category = await Category.findById(body.category);

    if (!category) {
        throw new BadRequest(`Category not found`);
    }

    if (category.type !== body.type) {
        throw new BadRequest(`The category type does not match the type in the request`);
    }

    const user = await User.findById(id);

    const balance =
        body.type === "income" ? user.balance + body.amount : user.balance - body.amount;

    if (balance < 0) {
        throw new BadRequest(`The expense amount cannot exceed the user's balance`);
    }

    user.balance = balance.toFixed(2);

    const data = await Transaction.create({ ...body, owner: id, balance: user.balance });

    await user.save();

    const resData = await Transaction.findOne(data)
        .populate("owner", "_id name email balance")
        .populate("category", "_id name type");

    res.status(201).json({ status: "success", code: 201, data: resData });
};

module.exports = add;
