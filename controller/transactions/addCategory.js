const { Category } = require("../../models");
const { Conflict } = require("http-errors");

const addCategory = async (req, res) => {
    const body = req.body;
    const { id } = req.user;

    const category = await Category.findOne({
        name: body.name,
        $or: [{ owner: id }, { owner: { $exists: false } }],
        type: body.type,
    });

    if (category) {
        throw new Conflict(`Category with name:${category.name} already exist`);
    }

    const newCategory = await Category.create({ ...body, owner: id });

    res.json({
        status: "success",
        code: 201,
        data: newCategory,
    });
};

module.exports = addCategory;
