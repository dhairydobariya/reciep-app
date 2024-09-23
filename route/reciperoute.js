let express = require('express');
let recipecontroll = require('../controllers/recipecontroller');
let route = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Recipe
 *     description: Recipe management routes
 */

/**
 * @swagger
 * /recipes/defaults:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Default recipe route
 *     description: This route is for testing the recipe API.
 *     responses:
 *       200:
 *         description: Success
 */
route.get('/defaults', recipecontroll.defaults);

/**
 * @swagger
 * /recipes:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Create a new recipe
 *     description: Add a new recipe to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *               cuisineType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       500:
 *         description: Server error
 */
route.post("/", recipecontroll.createrecipe);

/**
 * @swagger
 * /recipes:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Get all recipes
 *     description: Retrieve all recipes created by the authenticated user.
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized: No token provided
 *       500:
 *         description: Error fetching recipes
 */
route.get("/", recipecontroll.getAllRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   patch:
 *     tags:
 *       - Recipe
 *     summary: Update a recipe
 *     description: Update the details of a specific recipe by providing its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *               cuisineType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       500:
 *         description: Server error
 */
route.patch("/:id", recipecontroll.updateRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     tags:
 *       - Recipe
 *     summary: Delete a recipe
 *     description: Delete a recipe by providing its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       500:
 *         description: Server error
 */
route.delete("/:id", recipecontroll.deleteRecipe);

module.exports = route;
