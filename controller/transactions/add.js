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

    // const test = allTransaction.filter((trans) => {
    //     const bodyDate = new Date(body.date);
    //     const dateCompare = trans.date >= bodyDate;
    //     // const createdDateCompare = trans.createdAt >= new Date(Date.now());

    //     return dateCompare;
    // });

    const bodyDate = new Date(body.date);

    const find = await Transaction.find({
        date: { $gt: bodyDate },
        owner: id,
    });

    const totalAmount = find.reduce((acc, trans) => {
        if (trans.type === "income") {
            return acc + trans.amount;
        } else {
            return acc - trans.amount;
        }
    }, 0);

    const balance =
        body.type === "income" ? user.balance + body.amount : user.balance - body.amount;

    user.balance = balance.toFixed(2);

    await Transaction.create({
        ...body,
        amount: body.amount.toFixed(2),
        owner: id,
        balance: user.balance - totalAmount,
    });

    await user.save();

    await Transaction.updateMany(
        {
            date: { $gt: bodyDate },
            owner: id,
        },

        {
            $inc: { balance: body.type === "income" ? body.amount : -body.amount },
        }
    );

    const resData = await Transaction.find({ owner: id })
        .select("_id type category amount date balance comment createdAt")
        .populate({ path: "category", transform: (doc) => doc.name });

    const empData = resData.map((trans) => createEmpData(trans));

    res.status(201).json({
        status: "success",
        code: 201,
        data: { owner: { balance: user.balance }, result: empData },
    });
};

module.exports = add;
