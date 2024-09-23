const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  cuisineType: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true }); // Move timestamps here

module.exports = mongoose.model('Recipe', recipeSchema);
