let express = require("express");
let controll = require("../controllers/controller");
let route = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management routes
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - User
 *     summary: Default route
 *     description: This route is for testing the API.
 *     responses:
 *       200:
 *         description: Success
 */
route.get('/', controll.defaults);

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Register a new user by providing name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
route.post('/register', controll.register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Login a user by providing name and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
route.post('/login', controll.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - User
 *     summary: User logout
 *     description: Log the user out by clearing the token.
 *     responses:
 *       200:
 *         description: User successfully logged out
 */
route.get('/logout', controll.logout);

module.exports = route;
