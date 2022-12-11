const { Transaction, User, Category } = require("../../models");
const { BadRequest } = require("http-errors");
const { createEmpData } = require("../../helpers");

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

    if (body.type === "expense") {
        const allTransaction = await Transaction.find({ owner: id });

        const isBalanceLessZero =
            allTransaction
                .filter((trans) => {
                    const bodyDate = new Date(body.date);
                    const dateCompare = trans.date <= bodyDate;
                    return dateCompare;
                })
                .reduce((acc, trans) => {
                    if (trans.type === "expense") {
                        return acc - trans.amount;
                    } else if (trans.type === "income") {
                        return acc + trans.amount;
                    }
                    return acc;
                }, 0) -
                body.amount <
            0;

        if (isBalanceLessZero) {
            throw new BadRequest(
                `The amount of expenses cannot exceed the user's balance on a given date`
            );
        }
    }

    const balance =
        body.type === "income"
            ? user.balance + body.amount.toFixed(2)
            : user.balance - body.amount.toFixed(2);

    user.balance = balance.toFixed(2);

    const newTransaction = await Transaction.create({
        ...body,
        amount: body.amount.toFixed(2),
        owner: id,
        balance: user.balance,
    });

    await user.save();

    const resData = await Transaction.findOne(newTransaction)
        .select("_id type category amount date balance comment")
        .populate({ path: "category", transform: (doc) => doc.name });

    const empData = createEmpData(resData);

    res.status(201).json({ status: "success", code: 201, data: empData });
};

module.exports = add;
