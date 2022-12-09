const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");

const categorySchema = Schema(
    {
        name: {
            type: String,
            trim: true,
            min: 1,
            required: [true, "Name is required"],
        },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: [true, "Type is required"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { versionKey: false, timestamps: true }
);

categorySchema.post("save", handleSaveErrors);

const joiCategorySchema = Joi.object({
    type: Joi.string().valid("income", "expense").required(),
    name: Joi.string().min(1).max(20).required(),
});

const Category = model("category", categorySchema, "categories");

module.exports = {
    Category,
    joiCategorySchema,
};
