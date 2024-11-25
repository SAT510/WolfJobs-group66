/**
 * Import the mongoose library for MongoDB interactions.
 */
const mongoose = require("mongoose");
/**
 * Establish a connection to the MongoDB database.
 * Using Mongoose's `connect` method to specify the connection string.
 * The connection string includes the database cluster, user credentials, and options.
 */
mongoose.connect(
  "mongodb+srv://amay:aaaa1234@cluster0.falr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
/**
 * Access the Mongoose connection object.
 * The connection object provides event-based notifications and access to the database.
 */
const db = mongoose.connection;
/**
 * Event listener for MongoDB connection errors.
 * Logs an error message to the console if a connection error occurs.
 */
db.on("error", console.error.bind(console, "Error connecting to mongodb"));
/**
 * Event listener for successful MongoDB connection.
 * Logs a success message to the console when the connection is established.
 */
db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});
/**
 * Export the database connection object for reuse in other parts of the application.
 */
module.exports = db;
