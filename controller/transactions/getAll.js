const { Transaction } = require("../../models");
const { BadRequest } = require("http-errors");

const getAll = async (req, res) => {
    const { id } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const count = await Transaction.count({ owner: id });
    const totalPages = Math.ceil(count / limit);

    if (isNaN(totalPages)) {
        throw new BadRequest(`Invalid limit: They are expected to be an integer.`);
    }

    if (isNaN(page)) {
        throw new BadRequest(`Invalid page: They are expected to be an integer.`);
    }

    if (Number(page) < 1 || Number(page) > totalPages) {
        throw new BadRequest(`Invalid page: Pages start at 1 and max at ${totalPages}.`);
    }

    const data = await Transaction.find({ owner: id }, "", {
        skip,
        limit: Number(limit),
    })
        .populate("owner", "_id name email balance")
        .populate("category", "_id name type");

    const result = {
        page: Number(page),
        total_pages: totalPages,
        total_results: count,
        result: data,
    };

    res.status(200).json({ status: "success", code: 200, data: result });
};

module.exports = getAll;
