const jwt = require('jsonwebtoken');
const Recipe = require('../models/recipemodel');
require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET



let defaults = (req ,res) =>{
    res.send("its recipes default route")
}

let createrecipe = async (req, res) => {
    try {
        const token = req.cookies.token; // Retrieve the JWT from cookies

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const author = decoded.id; // Get the user ID from the decoded token

        const { title, ingredients, instructions, cuisineType } = req.body;

        // Create a new recipe
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            cuisineType,
            author, // Link the recipe to the authenticated user
        });

        await newRecipe.save();
        res.status(201).json({
            message: 'Recipe created successfully!',
            recipe: newRecipe,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating recipe', error: err.message });
    }
};

let getAllRecipes = async (req, res) => {
    try {
        const token = req.cookies.token; // Retrieve the JWT from cookies

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const author = decoded.id; // Get the user ID from the decoded token

        // Fetch recipes created by the authenticated user
        const recipes = await Recipe.find({ author }).populate('author', 'name email');

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recipes', error: err.message });
    }
};


let updateRecipe = async (req, res) => {
    try {
        const token = req.cookies.token; // Retrieve the JWT from cookies

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const author = decoded.id; // Get the user ID from the decoded token
        const recipeId = req.params.id; // Get the recipe ID from the request parameters

        // Find the recipe by ID and check if the author matches
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.author.toString() !== author) {
            return res.status(403).json({ message: 'Forbidden: You cannot update this recipe' });
        }

        // Update the recipe with the new data
        const { title, ingredients, instructions, cuisineType } = req.body;

        if (title) recipe.title = title;
        if (ingredients) recipe.ingredients = ingredients;
        if (instructions) recipe.instructions = instructions;
        if (cuisineType) recipe.cuisineType = cuisineType;

        await recipe.save();

        res.status(200).json({
            message: 'Recipe updated successfully!',
            recipe,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating recipe', error: err.message });
    }
};

// Delete a recipe
let deleteRecipe = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const author = decoded.id;
        const recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.author.toString() !== author) {
            return res.status(403).json({ message: 'Forbidden: You cannot delete this recipe' });
        }

        await Recipe.findByIdAndDelete(recipeId); // Delete the recipe using findByIdAndDelete

        res.status(200).json({
            message: 'Recipe deleted successfully!',
        });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting recipe', error: err.message });
    }
};


module.exports ={
    defaults ,
    createrecipe ,
    getAllRecipes,
    updateRecipe,
    deleteRecipe
}