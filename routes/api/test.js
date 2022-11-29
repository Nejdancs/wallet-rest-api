const express = require("express");
const { Schema, model } = require("mongoose");

const router = express.Router();

const testSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

const Test = model("test", testSchema);

router.get("/", async (req, res) => {
    const data = await Test.find();
    console.log(data);

    res.status(200).json({ message: "it's work", data });
});

module.exports = router;
