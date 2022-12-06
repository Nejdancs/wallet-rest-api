const { Category } = require("../../models");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "success",
    code: 200,
    data: {
      result: categories,
    },
  });
};

module.exports = getAllCategories;
