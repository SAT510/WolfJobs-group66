/**
 * Express Router for the application, handling different routes.
 * This module defines routes for the root path, users, and api endpoints.
 * It uses controllers and other routers for specific functionality.
 * 
 * @module Router
 */

// Import the express library to handle routing
const express = require("express");
/**
 * Router instance created using express.Router(), which is used to define 
 * the various routes for the application.
 * 
 * @type {Router}
 */
const router = express.Router();
// Import the homeController from the controllers directory to handle requests to the root path
const homeController = require("../controllers/home_controller");
// Log to the console when the router is loaded for debugging purposes
console.log("router loaded");
// Define the route for the root ("/") URL, using the homeController to handle the request
router.get("/", homeController.home);
// Use the '/users' route, delegating to another router defined in './users' module
router.use("/users", require("./users"));
// Use the '/api' route, delegating to another router defined in './api' module
router.use("/api", require("./api"));
// Export the router to make it available in other parts of the application
module.exports = router;
