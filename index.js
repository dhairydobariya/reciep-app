let express = require("express");
let route = require('./route/route');
let recipeRoute = require('./route/reciperoute'); // Assuming you have a recipe route.
let bodyparser = require('body-parser');
let mongoose = require('./db/database');
let cookieparser = require('cookie-parser');
let swaggerUi = require('swagger-ui-express');
let swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

let app = express();
let port = process.env.PORT || 4000;

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User & Recipe Management API',
            version: '1.0.0',
            description: 'API documentation for User and Recipe Management',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Your server URL
            },
        ],
    },
    apis: ['./route/*.js'], // Path to your route files where Swagger comments will be added
};

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Serve Swagger UI

// Routes
app.use('/', route); // User routes
app.use('/recipes', recipeRoute); // Recipe routes

// Start the server
app.listen(port, () => {
    console.log(`Server successfully running on port ${port}`);
});
