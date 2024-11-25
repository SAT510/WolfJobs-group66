// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");
/**
 * Schema for the History model, defining the structure of the document in the MongoDB collection.
 * @typedef {Object} History
 * @property {String} date - The date of the entry.
 * @property {Number} caloriesgain - The amount of calories gained, defaults to 0.
 * @property {Number} caloriesburn - The amount of calories burned, defaults to 0.
 * @property {ObjectId} user - The reference to the User associated with this history entry.
 */
const historySchema = new mongoose.Schema({
  // Date of the history entry
  date: {
    type: String, // Data type is String
    required: true, // The field is required
  },
  // Calories gained in the entry
  caloriesgain: {
    type: Number, // Data type is Number
    default: 0, // Default value is 0 if not provided
  },
  // Calories burned in the entry
  caloriesburn: {
    type: Number, // Data type is Number
    default: 0, // Default value is 0 if not provided
  },
  // Reference to the User model (ObjectId is used for MongoDB's document reference)
  user: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference another document
    ref: "User", // Reference to the "User" model (must match the model name)
  },
});
// Create a model named "History" based on the schema defined above
const History = mongoose.model("History", historySchema);
// Export the History model so it can be used in other files
module.exports = History;
