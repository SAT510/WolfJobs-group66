/**
 * This module defines a Mongoose schema for a "Food" collection,
 * specifying fields for food name and calories. It exports a model
 * for interacting with the collection.
 */

const mongoose = require("mongoose"); // 1. Import mongoose library to interact with MongoDB.

const foodSchema = new mongoose.Schema({
  Food: { // 2. Define the "Food" field in the schema.
    type: String, // 3. The type of the "Food" field is a string.
    required: true, // 4. The "Food" field is required when creating a document.
  },
  Calories: { // 5. Define the "Calories" field in the schema.
    type: String, // 6. The type of the "Calories" field is a string.
  },
}); // 7. End of foodSchema definition.

const Food = mongoose.model("Food", foodSchema); // 8. Create a Mongoose model named "Food" using the foodSchema.

module.exports = Food; // 9. Export the "Food" model so it can be used in other files.
