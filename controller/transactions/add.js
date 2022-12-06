const { Transaction } = require("../../models");

const add = async (req, res) => {
    const body = req.body;
    const { id } = req.user;
    console.log(body);

    const data = await Transaction.create({ ...body, owner: id });
    res.status(201).json({ status: "success", code: 201, data });
};

module.exports = add;
