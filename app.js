const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
// const swagger = require("./swagger");
const swaggerDocument = require("./swagger.json");
const path = require("path");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const pathPublic = path.join(__dirname, "public");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(pathPublic));

const options = {
    customCssUrl: "./public/swagger-ui.css",
};
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument, options));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, _, res, __) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ status: "error", code: status, message });
});

module.exports = app;
