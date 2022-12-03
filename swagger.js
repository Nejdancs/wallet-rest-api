const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const options = {
    customCssUrl: "/public/swagger-ui.css",
};

module.exports = swaggerUi.setup(swaggerDocs, options);
