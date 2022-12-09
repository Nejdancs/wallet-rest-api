const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors, formattedDate } = require("../helpers");

const transactionSchema = Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Owner is required"],
        },
        type: {
            type: String,
            enum: ["income", "expense"],
            required: [true, "Type is required"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: [true, "Category is required"],
            // временно
            // type: String,
            // required: [true, "Category is required"],
        },
        amount: {
            type: Number,
            min: 0.01,
            required: [true, "Amount is required"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        month: {
            type: Number,
            min: 1,
            max: 12,
        },
        year: {
            type: Number,
            min: 2000,
        },
        balance: {
            type: Number,
        },
        comment: {
            type: String,
            default: "",
        },
    },
    { versionKey: false, timestamps: true }
);

transactionSchema.pre("save", formattedDate);

transactionSchema.post("save", handleSaveErrors);

const joiCreateTransactionSchema = Joi.object({
    type: Joi.string().valid("income", "expense").required(),
    category: Joi.string().required(),
    date: Joi.date().min("2000-01-01").required(),
    amount: Joi.number().min(0.01).required(),
    comment: Joi.string().min(0).max(100),
});

const joiStatisticFilterSchema = Joi.object({
    month: Joi.number().min(1).max(12).required(),
    year: Joi.number().min(2000).required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    joiCreateTransactionSchema,
    joiStatisticFilterSchema,
};
