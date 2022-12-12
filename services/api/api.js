const axios = require("axios");

const fetchCurrency = async () => {
    const monoApi = async () => {
        const currencyCode = {
            804: "USD",
            978: "EUR",
            980: "UAH",
        };

        const { data } = await axios.get("https://api.monobnk.ua/bank/currency");
        const slicedData = data.slice(0, 3);

        const result = slicedData.map((el) => ({
            currencyA: currencyCode[el.currencyCodeA],
            currencyB: currencyCode[el.currencyCodeB],
            rateBuy: String(el.rateBuy.toFixed(5)),
            rateSell: String(el.rateSell.toFixed(5)),
        }));

        return result;
    };

    const privatApi = async () => {
        const { data } = await axios.get(
            "https://api.privatank.ua/p24api/pubinfo?exchange&coursid=11"
        );

        const result = data
            .map((el) => ({
                currencyA: el.ccy,
                currencyB: el.base_ccy,
                rateBuy: String(Number(el.buy).toFixed(5)),
                rateSell: String(Number(el.sale).toFixed(5)),
            }))
            .reverse();

        result.push({
            currencyA: result[1].currencyA,
            currencyB: result[0].currencyA,
            rateBuy: String((result[1].rateBuy / result[0].rateBuy).toFixed(5)),
            rateSell: String((result[1].rateSell / result[0].rateSell).toFixed(5)),
        });

        return result;
    };

    const promiseArr = await Promise.allSettled([privatApi(), monoApi()]);

    const result = promiseArr.find((el) => el.status === "fulfilled");

    return result.value;
};

module.exports = fetchCurrency;
