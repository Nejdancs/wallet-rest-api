const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const currencySchema = Schema(
    {
        currencyA: {
            type: Number,
            required: true,
        },
        currencyB: {
            type: Number,
            required: true,
        },
        rateBuy: {
            type: Number,
            required: true,
        },
        rateSell: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

currencySchema.post("save", handleSaveErrors);

const Currency = model("currency", currencySchema);

module.exports = {
    Currency,
};
