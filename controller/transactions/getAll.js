const { Transaction } = require("../../models");
const { createEmpData } = require("../../helpers");

const getAll = async (req, res) => {
    const { id } = req.user;

    const data = await Transaction.find({ owner: id })
        .select("_id type category amount date balance comment  createdAt")
        .populate({ path: "category", transform: (doc) => doc.name });

    const empData = data.map((trans) => createEmpData(trans));

    res.status(200).json({ status: "success", code: 200, data: empData });
};

module.exports = getAll;
