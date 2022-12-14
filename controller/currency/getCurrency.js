const { fetchCurrency } = require("../../services");
const { GatewayTimeout } = require("http-errors");

let lastUpdateDate = null;
let MEMO_DATA = null;
let attempts = 0;

const getCurrency = async (_, res, next) => {
    const timePassed = (lastUpdateDate) => {
        const timeDifference = Date.now() - lastUpdateDate;
        const result = timeDifference >= 3600000;
        return result;
    };

    const fetch = async () => {
        try {
            if (!MEMO_DATA || timePassed(lastUpdateDate)) {
                const data = await fetchCurrency();
                console.log("fetch");

                MEMO_DATA = data;
                lastUpdateDate = Date.now();
            }

            console.log("response");
            res.status(200).json({
                status: "success",
                code: 200,
                data: {
                    currency: MEMO_DATA,
                },
            });
        } catch (error) {
            attempts += 1;
            console.log(attempts);

            if (attempts > 4) {
                attempts = 0;
                console.log(error);
                next(GatewayTimeout("Timeout"));
            } else {
                console.log("Timeout");
                setTimeout(() => fetch(), 1000);
            }
        }
    };

    fetch();
};

module.exports = getCurrency;
