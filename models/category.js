const { Schema, model } = require("mongoose");
// const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const categorySchema = Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
    },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", handleSaveErrors);

const Category = model("category", categorySchema, "categories");

// const joiCategorySchema = Joi.object({
//   name: Joi.string(),
//   type: Joi.string().valueOf(["income", "expense"]),
// });

module.exports = {
  Category,
  // joiCategorySchema,
};
