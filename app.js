const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const swaggerRouter = require("./routes/api/swagger");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const pathPublic = path.join(__dirname, "public");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api-docs/public", express.static(pathPublic));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api-docs", swaggerRouter);

app.use((_, res) => {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, _, res, __) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ status: "error", code: status, message });
});

module.exports = app;
