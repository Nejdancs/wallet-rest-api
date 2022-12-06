const { Schema, model } = require("mongoose");
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

module.exports = {
    Category,
};
