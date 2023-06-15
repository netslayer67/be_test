const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js'], // Ganti dengan jalur file rute API Anda
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};
