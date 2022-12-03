const express = require("express");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
// const swagger = require("./swagger");
const swaggerDocument = require("./swagger.json");
const path = require("path");

const pathPublic = path.join(__dirname, "public");
router.use("/public", express.static(pathPublic));

const options = {
    customCssUrl: "./public/swagger-ui.css",
};
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument, options));

module.exports = router;
