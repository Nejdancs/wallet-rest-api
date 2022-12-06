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
      //   type: Schema.Types.ObjectId,
      //   ref: "category",
      //   required: [true, "Category is required"],
      // временно
      type: String,
      required: [true, "Category is required"],
    },
    amount: {
      type: Number,
      min: 0.01,
      required: [true, "Amount is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    month: {
      type: Number,
      min: 0,
      max: 11,
      required: true,
    },
    year: {
      type: Number,
      min: 2000,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.pre("save", formattedDate);

transactionSchema.post("save", handleSaveErrors);

const joiCreateTransactionSchema = Joi.object({
  type: Joi.string().valueOf(["income", "expense"]).required().messages({
    "string.pattern.base": `Please fill a valid type of transaction`,
  }),
  category: Joi.string().required().messages({
    "string.pattern.base": `Please fill a valid category of transaction`,
  }),
  amount: Joi.number().min(0.01).required().messages({
    "string.pattern.base": `Please fill a valid amount`,
  }),
  comment: Joi.string().max(100).messages({
    "string.pattern.base": `Comment must be less then 100 characters`,
  }),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  joiCreateTransactionSchema,
};
