/**
 * @fileoverview Schema for SavedJob model in MongoDB using Mongoose.
 * Defines the structure of the saved job documents.
 */

/**
 * SavedJobSchema defines the structure of the saved job data.
 * @typedef {Object} SavedJobSchema
 * @property {ObjectId} jobId - Reference to the Job model that the user has saved.
 * @property {ObjectId} userId - Reference to the User who saved the job.
 * @property {Date} createdAt - The date and time the job was saved.
 */

/**
 * Model for the SavedJob collection.
 * Represents the saved job information in the database.
 *
 * @type {mongoose.Model<SavedJobSchema>}
 */
// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");
// Define a new Mongoose schema for the SavedJob collection
const savedJobSchema = new mongoose.Schema({
  // Define the jobId field, which is a reference to a Job document in MongoDB
  jobId: {
    type: mongoose.Schema.Types.ObjectId, // Field is an ObjectId type
    ref: "Job", // References the "Job" collection in the database
    required: true, // This field is mandatory
  },
  // Define the userId field, which is a reference to a User document
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Field is an ObjectId type
    ref: "User", // References the "User" collection in the database
  },
  // Define the createdAt field, which stores the date when the job was saved
  createdAt: {
    type: Date, // Field is of Date type
    default: Date.now, // If no value is provided, set to the current date and time
  },
});
// Create a Mongoose model named "SavedJob" using the savedJobSchema
const SavedJob = mongoose.model("SavedJob", savedJobSchema);
// Export the SavedJob model so it can be used in other parts of the application
module.exports = SavedJob;
