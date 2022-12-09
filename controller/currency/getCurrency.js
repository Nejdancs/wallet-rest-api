const { fetchCurrency } = require("../../services");

const getCurrency = async (_, res) => {
    const data = await fetchCurrency();

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            currency: data,
        },
    });
};

module.exports = getCurrency;
