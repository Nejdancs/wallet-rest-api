const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const currencyRouter = require("./routes/api/currency");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/currency", currencyRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, _, res, __) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ status: "error", code: status, message });
});

module.exports = app;
