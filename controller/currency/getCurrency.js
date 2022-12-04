const axios = require("axios");

const getCurrency = async (_, res) => {
    // const monoApi = async () => {
    //     console.log("Mono");

    //     const currencyCode = {
    //         804: "USD",
    //         978: "EUR",
    //         980: "UAH",
    //     };

    //     const { data } = await axios.get("https://api.monobank.ua/bank/currency");
    //     const slicedData = data.slice(0, 3);

    //     const result = slicedData.map((el) => ({
    //         currencyA: currencyCode[el.currencyCodeA],
    //         currencyB: currencyCode[el.currencyCodeB],
    //         rateBuy: el.rateBuy,
    //         rateSell: el.rateSell,
    //     }));

    //     return result;
    // };

    const privatApi = async () => {
        console.log("Privat");

        const { data } = await axios.get(
            "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11"
        );

        const result = data.map((el) => ({
            currencyA: el.ccy,
            currencyB: el.base_ccy,
            rateBuy: el.buy,
            rateSell: el.sale,
        }));

        result.push({
            currencyA: "EUR",
            currencyB: "USD",
            rateBuy: result[0].buy / result[1].buy,
            rateSell: result[0].sale / result[1].sale,
        });

        return result;
    };

    const result = await Promise.race([privatApi()]);

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user: {
                message: result,
            },
        },
    });
};

module.exports = getCurrency;
